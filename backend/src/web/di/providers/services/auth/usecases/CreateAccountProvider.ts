import { CreateAccountUseCase } from '@application/auth/usecases';
import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { DataHasher } from '@common/encryption/DataHasher';
import { UserRepository } from '@core/user/repository/UserRepository';
import { Provider } from '@nestjs/common';
import { DataEncryptorDITokens, DataHasherDIToken } from '@web/di/tokens/encryption';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@web/di/tokens/services';

export const CreateAccountUseCaseProvider: Provider = {
  provide: AuthUseCaseDITokens.CreateAccount,
  
  useFactory: (
    dataEncryptor: DataEncryptor,
    dataHasher: DataHasher,
    userRepository: UserRepository,
  ) => new CreateAccountUseCase(
    dataEncryptor,
    dataHasher,
    userRepository,
  ),
  
  inject: [
    DataEncryptorDITokens.JwtEncryptor,
    DataHasherDIToken,
    PrismaRepositoryDITokens.UserRepository,
  ],
};