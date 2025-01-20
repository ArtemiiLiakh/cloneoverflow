import config from '@/config';
import { VerificationCodePayload } from '@application/auth/data/VerificationCodePayload';
import { EmailProvider } from '@application/interfaces/email/EmailProvider';
import { BadBodyException } from '@cloneoverflow/common';
import { DataHasher } from '@core/data/DataHasher';
import { CacheRepository } from '@core/domain/repositories/cache/CacheRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { randomInt } from 'crypto';
import { SendVerificationCodeInput, SendVerificationCodeOutput } from './dto';
import { ISendVerificationCodeUseCase } from './type';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789';

export class SendVerificationCodeUseCase implements ISendVerificationCodeUseCase {
  constructor (
    private userRepository: UserRepository,
    private emailProvider: EmailProvider,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}
  
  async execute ({ email, codeType }: SendVerificationCodeInput): Promise<SendVerificationCodeOutput> {
    const user = await this.userRepository.getByEmail({ email });

    if (!user) {
      throw new BadBodyException('Invalid user email');
    }

    const code = await this.generateCode(`user:${codeType}:${user.id}`);
    this.emailProvider.sendEmail(email, `Your password verification code: ${code}`);
  }

  private async generateCode (key: string, length = 6, retries = config.cache.CODE_RETRIES) {
    let code = '';

    for (let i = 0; i <= (length ?? 6); i++) {
      code += letters.at(randomInt(letters.length));
    }

    await this.cacheRepository.setObject<VerificationCodePayload>(key, {
      code: await this.dataHasher.hash(code),
      retries: retries,
    }, {
      ttl: config.cache.CODE_EXPIRATION_TIME,
    });

    return code;
  }
}