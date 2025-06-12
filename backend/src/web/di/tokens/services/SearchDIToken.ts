import { SearchService } from '@application/search/SearchService';
import { SearchQuestionsUseCase, SearchTagsUseCase } from '@application/search/usecases';

export const SearchUseCaseDITokens = {
  SearchQuestions: Symbol(SearchQuestionsUseCase.name),
  SearchTags: Symbol(SearchTagsUseCase.name),
};

export const SearchServiceDIToken = Symbol(SearchService.name);