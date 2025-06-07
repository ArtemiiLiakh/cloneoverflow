import { UserGetOwnAnswersUseCase } from '@application/user/usecases';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { UserUseCaseDITokens } from '@web/di/tokens/services';

export const UserGetOwnAnswersUseCaseProvider: Provider = {
  provide: UserUseCaseDITokens.GetOwnAnswers,
  useFactory: (answerRepository: AnswerRepository) => new UserGetOwnAnswersUseCase(answerRepository),
  inject: [PrismaRepositoryDITokens.AnswerRepository],
};