import { QuestionGetUseCase } from '@application/question/usecases';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@web/di/tokens/services';

export const QuestionGetUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Get,
  useFactory: (questionRepository: QuestionRepository) => new QuestionGetUseCase(questionRepository),
  inject: [PrismaRepositoryDITokens.QuestionRepository],
};