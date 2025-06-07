import { UserUpdateUseCase } from '@application/user/usecases';
import { UserRepository } from '@core/user/repository/UserRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { UserUseCaseDITokens } from '@web/di/tokens/services/UserDITokens';

export const UserUpdateUseCaseProvider: Provider = {
  provide: UserUseCaseDITokens.Update,
  useFactory: (userRepository: UserRepository) => new UserUpdateUseCase(userRepository),
  inject: [PrismaRepositoryDITokens.UserRepository],
};