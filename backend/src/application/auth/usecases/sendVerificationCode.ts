import config from '@/config';
import { CacheRepository } from '@core/domain/repositories/cache/CacheRepository';
import { randomInt } from 'crypto';
import { AuthServiceInput } from '../dtos/AuthServiceInput';
import { AuthServiceOutput } from '../dtos/AuthServiceOutput';
import { ISendVerificationCodeUseCase } from '../types/usecases';
import { EmailProvider } from '@application/interfaces/email/EmailProvider';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { Exception } from '@cloneoverflow/common';
import { DataHasher } from '@application/interfaces/security/DataHasher';
import { VerificationCodePayload } from '@application/auth/data/VerificationCodePayload';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789';

export class SendVerificationCodeUseCase implements ISendVerificationCodeUseCase {
  constructor (
    private userRepository: UserRepository,
    private emailProvider: EmailProvider,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}
  
  async execute ({ email, codeType }: AuthServiceInput.SendVerificationCode): Promise<AuthServiceOutput.SendVerificationCode> {
    const user = await this.userRepository.findByEmail({
      email,
    });

    if (!user) {
      throw new Exception('User with such email is not found');
    }

    const code = await this.generateCode(`user:${codeType}:${user.entity.id}`);
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