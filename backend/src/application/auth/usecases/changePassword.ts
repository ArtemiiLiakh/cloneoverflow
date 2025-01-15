import { BadBodyException, LoginException, UnauthorizedException, VerificationCodeType } from '@cloneoverflow/common';
import { DataHasher } from '@core/data/DataHasher';
import { CacheRepository } from '@core/domain/repositories/cache/CacheRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { VerificationCodePayload } from '../data/VerificationCodePayload';
import { AuthServiceInput } from '../dtos/AuthServiceInput';
import { IChangePasswordUseCase } from '../types/usecases';

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor (
    private userRepository: UserRepository,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}
  
  async execute ({ code, executorId, email, oldPassword, newPassword }: AuthServiceInput.ChangePassword): Promise<void> {
    const creds = await this.userRepository.getCreds({
      where: { userId: executorId },
    });

    if (!creds) {
      throw new UnauthorizedException();
    }

    const resolveCode = await this.cacheRepository.getObject<VerificationCodePayload>(
      `user:${VerificationCodeType.ChangePassword}:${executorId}`,
    );

    if (!resolveCode) {
      throw new BadBodyException('User does not have verification code');
    }
    
    if (!await this.dataHasher.compareHash(code, resolveCode.code)) {
      throw new BadBodyException('Code does not match');
    }

    if (creds.creds.email !== email || !await this.dataHasher.compareHash(oldPassword, creds.creds.password)) {
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