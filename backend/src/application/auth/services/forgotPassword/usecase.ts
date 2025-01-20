import { VerificationCodePayload } from '@application/auth/data/VerificationCodePayload';
import { BadBodyException, RetriesExpiredException, VerificationCodeType } from '@cloneoverflow/common';
import { DataHasher } from '@core/data/DataHasher';
import { CacheRepository } from '@core/domain/repositories/cache/CacheRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { ForgotPasswordInput, ForgotPasswordOutput } from './dto';
import { IForgotPasswordUseCase } from './type';

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor (
    private userRepository: UserRepository,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}

  async execute (
    { code, email, newPassword }: ForgotPasswordInput,
  ): Promise<ForgotPasswordOutput> {
    const user = await this.userRepository.getByEmail({ email });
    
    if (!user) {
      throw new BadBodyException('Invalid user email');
    }
  
    const resolveCode = await this.cacheRepository.getObject<VerificationCodePayload>(
      `user:${VerificationCodeType.ForgotPassword}:${user.id}`,
    );  
  
    if (!resolveCode) {
      throw new BadBodyException('User does not have verification code');
    }
  
    if (resolveCode.retries <= 0) {
      await this.cacheRepository.delete(
        `user:${VerificationCodeType.ForgotPassword}:${user.id}`,
      );
  
      throw new RetriesExpiredException();
    }
  
    if (!await this.dataHasher.compareHash(code, resolveCode.code)) {
      await this.cacheRepository.setObject<VerificationCodePayload>(
        `user:${VerificationCodeType.ForgotPassword}:${user.id}`, 
        {
          code: resolveCode.code,
          retries: resolveCode.retries-1, 
        },
      );
  
      throw new BadBodyException('Code does not match');
    }
  
    await this.cacheRepository.delete(`user:${VerificationCodeType.ForgotPassword}:${user.id}`);
  
    await this.userRepository.updateCreds({
      userId: user.id,
      creds: {
        password: await this.dataHasher.hash(newPassword),
      },
    });
  }
}