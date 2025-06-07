import { VerificationCodePayload } from '@application/auth/data';
import { VerificationCodeNotMatch } from '@application/auth/exceptions';
import { MissingVerificationCode } from '@application/auth/exceptions/MissingVerificationCode';
import { CacheRepository } from '@application/cache/CacheRepository';
import { RetriesExpiredException } from '@cloneoverflow/common';
import { DataHasher } from '@common/encryption/DataHasher';
import { VerificationCodeValidatorInput } from './dto';
import { IVerificationCodeValidator } from './type';

export class VerificationCodeValidator implements IVerificationCodeValidator {
  constructor (
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}

  async validate (
    { userId, code, codeType }: VerificationCodeValidatorInput,
  ): Promise<void> {
    const resolveCode = await this.cacheRepository.getObject<VerificationCodePayload>(
      `user:${codeType}:${userId}`,
    );
  
    if (!resolveCode) {
      throw new MissingVerificationCode();
    }
  
    if (resolveCode.retries <= 0) {
      await this.cacheRepository.delete(
        `user:${codeType}:${userId}`,
      );
  
      throw new RetriesExpiredException();
    }
  
    if (!await this.dataHasher.compareHash(code, resolveCode.code)) {
      await this.cacheRepository.setObject<VerificationCodePayload>(
        `user:${codeType}:${userId}`, 
        {
          code: resolveCode.code,
          retries: resolveCode.retries-1, 
        },
      );
  
      throw new VerificationCodeNotMatch();
    }
  }
}