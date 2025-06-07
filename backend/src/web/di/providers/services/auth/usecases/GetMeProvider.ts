import { GetMeUseCase } from '@application/auth/usecases';
import { UserRepository } from '@core/user/repository/UserRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@web/di/tokens/services';

export const GetMeUseCaseProvider: Provider = {
  provide: AuthUseCaseDITokens.GetMe,
  
  useFactory: (
    userRepository: UserRepository,
  ) => new GetMeUseCase(
    userRepository,
  ),
  
  inject: [
    PrismaRepositoryDITokens.UserRepository,
  ],
};