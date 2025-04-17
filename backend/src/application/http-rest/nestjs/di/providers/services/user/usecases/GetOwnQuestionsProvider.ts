import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { UserUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { QuestionRepository } from '@core/repositories';
import { UserGetOwnQuestionsUseCase } from '@core/services/user';
import { Provider } from '@nestjs/common';

export const UserGetOwnQuestionsUseCaseProvider: Provider = {
  provide: UserUseCaseDITokens.GetOwnQuestions,
  useFactory: (questionRepository: QuestionRepository) => new UserGetOwnQuestionsUseCase(questionRepository),
  inject: [PrismaRepositoryDITokens.QuestionRepository],
};