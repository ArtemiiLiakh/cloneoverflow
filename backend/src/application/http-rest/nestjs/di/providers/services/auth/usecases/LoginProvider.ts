import { DataEncryptorDITokens, DataHasherDIToken } from '@application/http-rest/nestjs/di/tokens/encryption';
import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { LoginUseCase } from '@application/services/auth/usecases';
import { DataHasher } from '@common/encryption/DataHasher';
import { UserRepository } from '@core/repositories';
import { Provider } from '@nestjs/common';

export const LoginUseCaseProvider: Provider = {
  provide: AuthUseCaseDITokens.Login,
  
  useFactory: (
    userRepository: UserRepository,
    dataEncryptor: DataEncryptor,
    dataHasher: DataHasher,
  ) => new LoginUseCase(
    userRepository,
    dataEncryptor,
    dataHasher,
  ),
  
  inject: [
    PrismaRepositoryDITokens.UserRepository,
    DataEncryptorDITokens.JwtEncryptor,
    DataHasherDIToken,
  ],
};