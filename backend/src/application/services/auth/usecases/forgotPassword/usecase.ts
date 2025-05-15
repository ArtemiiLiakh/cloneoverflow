import { VerificationCodeType } from '@cloneoverflow/common';
import { DataHasher } from '@core/data/DataHasher';
import { CacheRepository } from '@core/domain/repositories/cache/CacheRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { IVerificationCodeValidator } from '../validators/types';
import { ForgotPasswordInput, ForgotPasswordOutput } from './dto';
import { IForgotPasswordUseCase } from './type';

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor (
    private codeValidator: IVerificationCodeValidator,
    private userRepository: UserRepository,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}

  async execute (
    { code, email, newPassword }: ForgotPasswordInput,
  ): Promise<ForgotPasswordOutput> {
    const user = await this.userRepository.getByEmail({ email });
    
    await this.codeValidator.validate({
      userId: user.id,
      code,
      codeType: VerificationCodeType.ForgotPassword,
    });
  
    await this.cacheRepository.delete(`user:${VerificationCodeType.ForgotPassword}:${user.id}`);
  
    await this.userRepository.updateCreds({
      userId: user.id,
      creds: {
        password: await this.dataHasher.hash(newPassword),
      },
    });
  }
}