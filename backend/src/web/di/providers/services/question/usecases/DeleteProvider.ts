import { QuestionDeleteUseCase } from '@application/question/usecases';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@web/di/tokens/services';

export const QuestionDeleteUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Delete,
  useFactory: (questionRepository: QuestionRepository) => new QuestionDeleteUseCase(questionRepository),
  inject: [PrismaRepositoryDITokens.QuestionRepository],
};