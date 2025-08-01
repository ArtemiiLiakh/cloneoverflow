import { IVerificationCodeValidator } from '@application/validators/types';
import { VerificationCodeType } from '@cloneoverflow/common';
import { DataHasher } from '@common/encryption/DataHasher';
import { CacheRepository } from '@application/cache/CacheRepository';
import { UserRepository } from '@core/user/repository/UserRepository';
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
      userId: user.userId,
      code,
      codeType: VerificationCodeType.ForgotPassword,
    });
  
    await this.cacheRepository.delete(`user:${VerificationCodeType.ForgotPassword}:${user.userId}`);
  
    await this.userRepository.updateCreds({
      userId: user.userId,
      data: {
        password: await this.dataHasher.hash(newPassword),
      },
    });
  }
}