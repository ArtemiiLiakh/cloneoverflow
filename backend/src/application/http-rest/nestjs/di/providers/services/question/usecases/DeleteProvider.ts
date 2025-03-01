import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { QuestionRepository } from '@core/repositories';
import { QuestionDeleteUseCase } from '@core/services/question';
import { Provider } from '@nestjs/common';

export const QuestionDeleteUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Delete,
  useFactory: (questionRepository: QuestionRepository) => new QuestionDeleteUseCase(questionRepository),
  inject: [PrismaRepositoryDITokens.QuestionRepository],
};