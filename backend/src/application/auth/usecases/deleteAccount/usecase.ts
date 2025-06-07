import { IVerificationCodeValidator } from '@application/validators/types';
import { VerificationCodeType } from '@cloneoverflow/common';
import { DataHasher } from '@common/encryption/DataHasher';
import { CacheRepository } from '@application/cache/CacheRepository';
import { UserRepository } from '@core/user/repository/UserRepository';
import { DeleteAccountInput, DeleteAccountOutput } from './dto';
import { IDeleteAccountUseCase } from './type';
import { LoginException } from '@application/auth/exceptions/LoginException';

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
    const user = await this.userRepository.getById({
      userId: executorId,
    });

    const creds = await this.userRepository.getCreds({
      userId: executorId,
    });
  
    if (creds.email !== email) {
      throw new LoginException();
    }

    await this.codeValidator.validate({
      userId: creds.userId,
      code,
      codeType: VerificationCodeType.DeleteAccount,
    });

    if (!await this.dataHasher.compareHash(password, creds.password)) {
      throw new LoginException();
    }

    await this.cacheRepository.delete(`user:${VerificationCodeType.DeleteAccount}:${creds.userId}`);

    await this.userRepository.delete({ 
      userId: executorId,
    });
  
    return user;
  }
}