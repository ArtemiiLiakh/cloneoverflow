import { DataHasherDIToken } from '@application/http-rest/nestjs/di/tokens/encryption/DataHasherDIToken';
import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { UserUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services/UserDITokens';
import { DataHasher } from '@common/encryption/DataHasher';
import { UserRepository } from '@core/repositories';
import { UserCreateUseCase } from '@core/services/user';
import { Provider } from '@nestjs/common';

export const UserCreateUseCaseProvider: Provider = {
  provide: UserUseCaseDITokens.Create,
  useFactory: (
    userRepository: UserRepository, dataHasher: DataHasher,
  ) => new UserCreateUseCase(userRepository, dataHasher),
  inject: [PrismaRepositoryDITokens.UserRepository, DataHasherDIToken],
};