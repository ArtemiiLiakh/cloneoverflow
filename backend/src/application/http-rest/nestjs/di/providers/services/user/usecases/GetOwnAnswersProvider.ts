import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { UserUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { AnswerRepository } from '@core/repositories';
import { UserGetOwnAnswersUseCase } from '@core/services/user';
import { Provider } from '@nestjs/common';

export const UserGetOwnAnswersUseCaseProvider: Provider = {
  provide: UserUseCaseDITokens.GetOwnAnswers,
  useFactory: (answerRepository: AnswerRepository) => new UserGetOwnAnswersUseCase(answerRepository),
  inject: [PrismaRepositoryDITokens.AnswerRepository],
};