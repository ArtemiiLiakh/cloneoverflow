import { SearchServiceFacade } from '@application/facades/SearchServiceFacade';
import { SearchQuestionsUseCase, SearchTagsUseCase } from '@core/services/search';

export const SearchUseCaseDITokens = {
  SearchQuestions: Symbol(SearchQuestionsUseCase.name),
  SearchTags: Symbol(SearchTagsUseCase.name),
};

export const SearchServiceDIToken = Symbol(SearchServiceFacade.name);