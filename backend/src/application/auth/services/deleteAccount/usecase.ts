import { VerificationCodePayload } from '@application/auth/data/VerificationCodePayload';
import { BadBodyException, LoginException, RetriesExpiredException, VerificationCodeType } from '@cloneoverflow/common';
import { DataHasher } from '@core/data/DataHasher';
import { CacheRepository } from '@core/domain/repositories/cache/CacheRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { DeleteAccountInput, DeleteAccountOutput } from './dto';
import { IDeleteAccountUseCase } from './type';

export class DeleteAccountUseCase implements IDeleteAccountUseCase {
  constructor (
    private userRepository: UserRepository,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}

  async execute (
    { executorId, code, email, password }: DeleteAccountInput,
  ): Promise<DeleteAccountOutput> {
    const confirmUser = await this.userRepository.getCreds({
      where: { email },
      withUser: true,
    });
  
    if (!confirmUser) {
      throw new BadBodyException('Invalid user email');
    }

    const resolveCode = await this.cacheRepository.getObject<VerificationCodePayload>(
      `user:${VerificationCodeType.DeletePassword}:${executorId}`,
    );
    
    if (!resolveCode) {
      throw new BadBodyException('User does not have verification code');
    }

    if (resolveCode.retries <= 0) {
      await this.cacheRepository.delete(`user:${VerificationCodeType.DeletePassword}:${executorId}`);
  
      throw new RetriesExpiredException();
    }

    if (!await this.dataHasher.compareHash(code, resolveCode.code)) {
      throw new BadBodyException('Code does not match');
    }

    if (
      confirmUser.creds.email !== email || 
      !await this.dataHasher.compareHash(password, confirmUser.creds.password)
    ) {
      throw new LoginException();
    }

    await this.userRepository.delete({ 
      userId: executorId,
    });
  
    return confirmUser.user!;
  }
}