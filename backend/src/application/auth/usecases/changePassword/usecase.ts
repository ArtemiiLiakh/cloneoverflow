import { IVerificationCodeValidator } from '@application/validators/types';
import { VerificationCodeType } from '@cloneoverflow/common';
import { DataHasher } from '@common/encryption/DataHasher';
import { CacheRepository } from '@application/cache/CacheRepository';
import { UserRepository } from '@core/user/repository/UserRepository';
import { ChangePasswordInput, ChangePasswordOutput } from './dto';
import { IChangePasswordUseCase } from './type';
import { LoginException } from '@application/auth/exceptions/LoginException';

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor (
    private codeValidator: IVerificationCodeValidator,
    private userRepository: UserRepository,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}
  
  async execute (
    { code, executorId, email, oldPassword, newPassword }: ChangePasswordInput,
  ): Promise<ChangePasswordOutput> {
    const creds = await this.userRepository.getCreds({ email }).catch(() => {
      throw new LoginException();
    });

    await this.codeValidator.validate({
      userId: executorId,
      code,
      codeType: VerificationCodeType.ChangePassword,
    });

    if (!await this.dataHasher.compareHash(oldPassword, creds.password)) {
      throw new LoginException();
    }
    
    await this.cacheRepository.delete(`user:${VerificationCodeType.ChangePassword}:${executorId}`);

    await this.userRepository.updateCreds({
      userId: executorId,
      data: {
        password: await this.dataHasher.hash(newPassword),
      },
    });
  }
}