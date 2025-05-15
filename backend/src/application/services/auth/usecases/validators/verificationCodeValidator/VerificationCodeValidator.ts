import { VerificationCodePayload } from '@application/services/auth/data';
import { BadBodyException, RetriesExpiredException } from '@cloneoverflow/common';
import { DataHasher } from '@core/data/DataHasher';
import { CacheRepository } from '@core/domain/repositories';
import { VerificationCodeValidatorInput, VerificationCodeValidatorOutput } from './dto';
import { IVerificationCodeValidator } from './type';

export class VerificationCodeValidator implements IVerificationCodeValidator {
  constructor (
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}

  async validate (
    { userId, code, codeType }: VerificationCodeValidatorInput,
  ): Promise<VerificationCodeValidatorOutput> {
    const resolveCode = await this.cacheRepository.getObject<VerificationCodePayload>(
      `user:${codeType}:${userId}`,
    );  
  
    if (!resolveCode) {
      throw new BadBodyException('User does not have verification code');
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
  
      throw new BadBodyException('Code does not match');
    }
  }
}