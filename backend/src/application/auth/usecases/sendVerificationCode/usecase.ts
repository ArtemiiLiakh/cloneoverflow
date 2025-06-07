import config from '@/config';
import { VerificationCodePayload } from '@application/auth/data';
import { CacheRepository } from '@application/cache/CacheRepository';
import { DataHasher } from '@common/encryption/DataHasher';
import { EmailService } from '@common/services/EmailService';
import { UserRepository } from '@core/user/repository/UserRepository';
import { randomInt } from 'crypto';
import { SendVerificationCodeInput, SendVerificationCodeOutput } from './dto';
import { ISendVerificationCodeUseCase } from './type';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export class SendVerificationCodeUseCase implements ISendVerificationCodeUseCase {
  constructor (
    private userRepository: UserRepository,
    private emailService: EmailService,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}
  
  async execute ({ email, codeType }: SendVerificationCodeInput): Promise<SendVerificationCodeOutput> {
    const user = await this.userRepository.getByEmail({ email });

    const code = await this.generateCode(`user:${codeType}:${user.userId}`);
    this.emailService.sendEmail(email, `Your password verification code: ${code}`)
      .catch((e) => {
        console.error('Email error:', e);
      });
  }

  private async generateCode (
    key: string, 
    length = 6, 
    retries = config.cache.CODE_RETRIES,
  ): Promise<string> {
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