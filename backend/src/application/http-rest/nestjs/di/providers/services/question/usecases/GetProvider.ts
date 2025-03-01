import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { QuestionRepository } from '@core/repositories';
import { QuestionGetUseCase } from '@core/services/question';
import { Provider } from '@nestjs/common';

export const QuestionGetUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Get,
  useFactory: (questionRepository: QuestionRepository) => new QuestionGetUseCase(questionRepository),
  inject: [PrismaRepositoryDITokens.QuestionRepository],
};