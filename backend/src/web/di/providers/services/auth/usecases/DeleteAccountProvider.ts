import { DeleteAccountUseCase } from '@application/auth/usecases';
import { CacheRepository } from '@application/cache/CacheRepository';
import { IVerificationCodeValidator } from '@application/validators/types';
import { DataHasher } from '@common/encryption/DataHasher';
import { UserRepository } from '@core/user/repository/UserRepository';
import { Provider } from '@nestjs/common';
import { DataHasherDIToken } from '@web/di/tokens/encryption';
import { PrismaRepositoryDITokens, RedisRepositoryDITokens } from '@web/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@web/di/tokens/services';
import { ValidatorDITokens } from '@web/di/tokens/ValidatorDITokens';

export const DeleteAccountUseCaseProvider: Provider = {
  provide: AuthUseCaseDITokens.DeleteAccount,
  
  useFactory: (
    codeValidator: IVerificationCodeValidator,
    userRepository: UserRepository,
    cacheRepository: CacheRepository,
    dataHasher: DataHasher,
  ) => new DeleteAccountUseCase(
    codeValidator,
    userRepository,
    cacheRepository,
    dataHasher,
  ),
  
  inject: [
    ValidatorDITokens.VerificationCodeValidator,
    PrismaRepositoryDITokens.UserRepository,
    RedisRepositoryDITokens.CacheRepository,
    DataHasherDIToken,
  ],
};