import { DataHasher } from '@application/interfaces/security/DataHasher';
import { BadBodyException, LoginException, NoEntityWithIdException, VerificationCodeType } from '@cloneoverflow/common';
import { CacheRepository } from '@core/domain/repositories/cache/CacheRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { AuthServiceInput } from '../dtos/AuthServiceInput';
import { IChangePasswordUseCase } from '../types/usecases';
import { VerificationCodePayload } from '../data/VerificationCodePayload';

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor (
    private userRepository: UserRepository,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}
  
  async execute ({ code, executorId, email, oldPassword, newPassword }: AuthServiceInput.ChangePassword): Promise<void> {
    const user = await this.userRepository.findCreds({
      where: { id: executorId },
    });

    if (!user) {
      throw new NoEntityWithIdException('User');
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

    if (user.email !== email || !await this.dataHasher.compareHash(oldPassword, user.password)) {
      throw new LoginException();
    }
    
    await this.cacheRepository.delete(`user:${VerificationCodeType.ChangePassword}:${executorId}`);

    await this.userRepository.updateCreds({
      id: executorId,
      creds: {
        password: await this.dataHasher.hash(newPassword),
      },
    });
  }
}