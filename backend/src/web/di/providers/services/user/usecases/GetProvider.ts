import { UserGetUseCase } from '@application/user/usecases';
import { UserRepository } from '@core/user/repository/UserRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { UserUseCaseDITokens } from '@web/di/tokens/services/UserDITokens';

export const UserGetUseCaseProvider: Provider = {
  provide: UserUseCaseDITokens.Get,
  useFactory: (userRepository: UserRepository) => new UserGetUseCase(userRepository),
  inject: [PrismaRepositoryDITokens.UserRepository],
};