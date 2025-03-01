import { DataHasherDIToken } from '@application/http-rest/nestjs/di/tokens/encryption';
import { PrismaRepositoryDITokens, RedisRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { ValidatorDITokens } from '@application/http-rest/nestjs/di/tokens/ValidatorDITokens';
import { ChangePasswordUseCase } from '@application/services/auth/usecases';
import { IVerificationCodeValidator } from '@application/services/auth/usecases/validators/types';
import { DataHasher } from '@common/encryption/DataHasher';
import { CacheRepository, UserRepository } from '@core/repositories';
import { Provider } from '@nestjs/common';

export const ChangePasswordUseCaseProvider: Provider = {
  provide: AuthUseCaseDITokens.ChangePassword,
  
  useFactory: (
    codeValidator: IVerificationCodeValidator,
    userRepository: UserRepository,
    cacheRepository: CacheRepository,
    dataHasher: DataHasher,
  ) => new ChangePasswordUseCase(
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