import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { UserUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services/UserDITokens';
import { UserRepository } from '@core/repositories';
import { UserGetUseCase } from '@core/services/user';
import { Provider } from '@nestjs/common';

export const UserGetUseCaseProvider: Provider = {
  provide: UserUseCaseDITokens.Get,
  useFactory: (userRepository: UserRepository) => new UserGetUseCase(userRepository),
  inject: [PrismaRepositoryDITokens.UserRepository],
};