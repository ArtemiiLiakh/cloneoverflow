import { SearchServiceFacade } from '@application/service-facades/SearchServiceFacade';
import { SearchQuestionsUseCase, SearchTagsUseCase } from '@core/services/search';
import { Provider } from '@nestjs/common';
import { SearchServiceDIToken, SearchUseCaseDITokens } from '../../../tokens/services';

export const SearchServiceProvider: Provider = {
  provide: SearchServiceDIToken,
  
  useFactory: (
    searchQuestionsUseCase: SearchQuestionsUseCase,
    searchTagsUseCase: SearchTagsUseCase,
  ) => SearchServiceFacade.new({
    searchQuestionsUseCase,
    searchTagsUseCase,
  }),

  inject: [SearchUseCaseDITokens.SearchQuestions, SearchUseCaseDITokens.SearchTags],
};