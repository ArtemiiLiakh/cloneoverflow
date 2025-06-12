import { SearchService } from '@application/search/SearchService';
import { SearchQuestionsUseCase, SearchTagsUseCase } from '@application/search/usecases';
import { Provider } from '@nestjs/common';
import { SearchServiceDIToken, SearchUseCaseDITokens } from '@web/di/tokens/services';

export const SearchServiceProvider: Provider = {
  provide: SearchServiceDIToken,
  
  useFactory: (
    searchQuestionsUseCase: SearchQuestionsUseCase,
    searchTagsUseCase: SearchTagsUseCase,
  ) => SearchService.new({
    searchQuestionsUseCase,
    searchTagsUseCase,
  }),

  inject: [SearchUseCaseDITokens.SearchQuestions, SearchUseCaseDITokens.SearchTags],
};