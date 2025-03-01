import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { UserUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services/UserDITokens';
import { UserRepository } from '@core/repositories';
import { UserUpdateUseCase } from '@core/services/user';
import { Provider } from '@nestjs/common';

export const UserUpdateUseCaseProvider: Provider = {
  provide: UserUseCaseDITokens.Update,
  useFactory: (userRepository: UserRepository) => new UserUpdateUseCase(userRepository),
  inject: [PrismaRepositoryDITokens.UserRepository],
};