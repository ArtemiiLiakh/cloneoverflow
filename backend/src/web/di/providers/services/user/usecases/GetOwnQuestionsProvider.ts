import { UserGetOwnQuestionsUseCase } from '@application/user/usecases';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { UserUseCaseDITokens } from '@web/di/tokens/services';

export const UserGetOwnQuestionsUseCaseProvider: Provider = {
  provide: UserUseCaseDITokens.GetOwnQuestions,
  useFactory: (questionRepository: QuestionRepository) => new UserGetOwnQuestionsUseCase(questionRepository),
  inject: [PrismaRepositoryDITokens.QuestionRepository],
};