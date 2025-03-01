import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { SearchUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { QuestionRepository } from '@core/repositories';
import { SearchQuestionsUseCase } from '@core/services/search';
import { Provider } from '@nestjs/common';

export const SearchQuestionsUseCaseProvider: Provider = {
  provide: SearchUseCaseDITokens.SearchQuestions,
  useFactory: (questionRepository: QuestionRepository) => new SearchQuestionsUseCase(questionRepository),
  inject: [PrismaRepositoryDITokens.QuestionRepository],
};