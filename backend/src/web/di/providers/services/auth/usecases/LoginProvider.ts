import { LoginUseCase } from '@application/auth/usecases';
import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { DataHasher } from '@common/encryption/DataHasher';
import { UserRepository } from '@core/user/repository/UserRepository';
import { Provider } from '@nestjs/common';
import { DataEncryptorDITokens, DataHasherDIToken } from '@web/di/tokens/encryption';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@web/di/tokens/services';

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