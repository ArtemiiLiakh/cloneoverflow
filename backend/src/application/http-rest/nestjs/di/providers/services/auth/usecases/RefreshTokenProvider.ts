import { DataEncryptorDITokens } from '@application/http-rest/nestjs/di/tokens/encryption';
import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { RefreshTokenUseCase } from '@application/services/auth/usecases';
import { UserRepository } from '@core/repositories';
import { Provider } from '@nestjs/common';

export const RefreshTokenUseCaseProvider: Provider = {
  provide: AuthUseCaseDITokens.RefreshToken,
  
  useFactory: (
    dataEncryptor: DataEncryptor,
    userRepository: UserRepository,
  ) => new RefreshTokenUseCase(
    dataEncryptor,
    userRepository,
  ),
  
  inject: [
    DataEncryptorDITokens.JwtEncryptor,
    PrismaRepositoryDITokens.UserRepository,
  ],
};