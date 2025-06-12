import { SearchQuestionsUseCase } from '@application/search/usecases';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { SearchUseCaseDITokens } from '@web/di/tokens/services';

export const SearchQuestionsUseCaseProvider: Provider = {
  provide: SearchUseCaseDITokens.SearchQuestions,
  useFactory: (questionRepository: QuestionRepository) => new SearchQuestionsUseCase(questionRepository),
  inject: [PrismaRepositoryDITokens.QuestionRepository],
};