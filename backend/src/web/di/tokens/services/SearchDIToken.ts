import { SearchService } from '@application/search/SearchService';
import { SearchQuestionsUseCase, SearchTagsUseCase } from '@application/search/usercases';

export const SearchUseCaseDITokens = {
  SearchQuestions: Symbol(SearchQuestionsUseCase.name),
  SearchTags: Symbol(SearchTagsUseCase.name),
};

export const SearchServiceDIToken = Symbol(SearchService.name);