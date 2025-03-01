import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { QuestionRepository } from '@core/repositories';
import { QuestionGetManyUseCase } from '@core/services/question';
import { Provider } from '@nestjs/common';

export const QuestionGetManyUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.GetMany,
  useFactory: (questionRepository: QuestionRepository) => new QuestionGetManyUseCase(questionRepository),
  inject: [PrismaRepositoryDITokens.QuestionRepository],
};