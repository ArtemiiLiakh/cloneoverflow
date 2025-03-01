import { DataHasherDIToken } from '@application/http-rest/nestjs/di/tokens/encryption';
import { PrismaRepositoryDITokens, RedisRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { ValidatorDITokens } from '@application/http-rest/nestjs/di/tokens/ValidatorDITokens';
import { DeleteAccountUseCase } from '@application/services/auth/usecases';
import { VerificationCodeValidator } from '@application/services/auth/usecases/validators';
import { DataHasher } from '@common/encryption/DataHasher';
import { CacheRepository, UserRepository } from '@core/repositories';
import { Provider } from '@nestjs/common';

export const DeleteAccountUseCaseProvider: Provider = {
  provide: AuthUseCaseDITokens.DeleteAccount,
  
  useFactory: (
    codeValidator: VerificationCodeValidator,
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