import { BadBodyException, LoginException, VerificationCodeType } from '@cloneoverflow/common';
import { DataHasher } from '@core/data/DataHasher';
import { CacheRepository } from '@core/domain/repositories/cache/CacheRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { DeleteAccountInput, DeleteAccountOutput } from './dto';
import { IDeleteAccountUseCase } from './type';
import { IVerificationCodeValidator } from '../validators/types';

export class DeleteAccountUseCase implements IDeleteAccountUseCase {
  constructor (
    private codeValidator: IVerificationCodeValidator,
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

    await this.codeValidator.validate({
      userId: confirmUser.creds.id,
      code,
      codeType: VerificationCodeType.DeletePassword,
    });

    if (
      confirmUser.creds.email !== email || 
      !await this.dataHasher.compareHash(password, confirmUser.creds.password)
    ) {
      throw new LoginException();
    }

    await this.cacheRepository.delete(`user:${VerificationCodeType.DeletePassword}:${confirmUser.creds.id}`);

    await this.userRepository.delete({ 
      userId: executorId,
    });
  
    return confirmUser.user!;
  }
}