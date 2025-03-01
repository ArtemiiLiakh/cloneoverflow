import { LoginException, UnauthorizedException, VerificationCodeType } from '@cloneoverflow/common';
import { DataHasher } from '@common/encryption/DataHasher';
import { CacheRepository } from '@core/repositories/cache/CacheRepository';
import { UserRepository } from '@core/repositories/user/UserRepository';
import { IVerificationCodeValidator } from '../validators/types';
import { ChangePasswordInput, ChangePasswordOutput } from './dto';
import { IChangePasswordUseCase } from './type';

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
    const creds = await this.userRepository.getCreds({
      where: { userId: executorId },
    }).then(res => res?.creds);

    if (!creds) {
      throw new UnauthorizedException();
    }

    await this.codeValidator.validate({
      userId: executorId,
      code,
      codeType: VerificationCodeType.ChangePassword,
    });

    if (creds.email !== email || !await this.dataHasher.compareHash(oldPassword, creds.password)) {
      throw new LoginException();
    }
    
    await this.cacheRepository.delete(`user:${VerificationCodeType.ChangePassword}:${executorId}`);

    await this.userRepository.updateCreds({
      userId: executorId,
      creds: {
        password: await this.dataHasher.hash(newPassword),
      },
    });
  }
}