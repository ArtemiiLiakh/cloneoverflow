import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AuthUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { GetMeUseCase } from '@application/services/auth/usecases';
import { UserRepository } from '@core/repositories';
import { Provider } from '@nestjs/common';

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