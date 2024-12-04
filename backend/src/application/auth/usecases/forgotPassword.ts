import { DataHasher } from '@application/interfaces/security/DataHasher';
import { BadBodyException, RetriesExpiredException, VerificationCodeType } from '@cloneoverflow/common';
import { CacheRepository } from '@core/domain/repositories/cache/CacheRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { AuthServiceInput } from '../dtos/AuthServiceInput';
import { AuthServiceOutput } from '../dtos/AuthServiceOutput';
import { IForgotPasswordUseCase } from '../types/usecases';
import { VerificationCodePayload } from '../data/VerificationCodePayload';

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor (
    private userRepository: UserRepository,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}

  async execute (
    { code, email, newPassword }: AuthServiceInput.ForgotPassword,
  ): Promise<AuthServiceOutput.ForgotPassword> {
    const user = await this.userRepository.findByEmail({
      email,
    });
    
    if (!user) {
      throw new BadBodyException('No user with this email');
    }
  
    const resolveCode = await this.cacheRepository.getObject<VerificationCodePayload>(`user:${VerificationCodeType.ForgotPassword}:${user.entity.id}`);  
  
    if (!resolveCode) {
      throw new BadBodyException('User does not have verification code');
    }
  
    if (resolveCode.retries <= 0) {
      await this.cacheRepository.delete(`user:${VerificationCodeType.ForgotPassword}:${user.entity.id}`);
  
      throw new RetriesExpiredException();
    }
  
    if (!await this.dataHasher.compareHash(code, resolveCode.code)) {
      await this.cacheRepository.setObject<VerificationCodePayload>(`user:${VerificationCodeType.ForgotPassword}:${user.entity.id}`, {
        code: resolveCode.code,
        retries: resolveCode.retries-1, 
      });
  
      throw new BadBodyException('Code does not match');
    }
  
    await this.cacheRepository.delete(`user:${VerificationCodeType.ForgotPassword}:${user.entity.id}`);
  
    await this.userRepository.updateCreds({
      id: user.entity.id,
      creds: {
        password: await this.dataHasher.hash(newPassword),
      },
    });
  }
}