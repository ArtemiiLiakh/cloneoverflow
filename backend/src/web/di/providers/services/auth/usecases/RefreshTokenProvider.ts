import { RefreshTokenUseCase } from '@application/auth/usecases';
import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { UserRepository } from '@core/user/repository/UserRepository';
import { Provider } from '@nestjs/common';
import { DataEncryptorDITokens } from '@web/di/tokens/encryption';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@web/di/tokens/services';

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