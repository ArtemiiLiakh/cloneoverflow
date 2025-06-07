import {
  SearchQuestionsInput,
  SearchQuestionsOutput,
  SearchTagsInput,
  SerachTagsOutput,
} from '@application/search/usercases/dtos';

import {
  ISearchQuestionsUseCase,
  ISearchTagsUseCase,
} from '@application/search/usercases/types';

export class SearchService {
  constructor (
    private searchQuestionsUseCase: ISearchQuestionsUseCase,
    private searchTagsUseCase: ISearchTagsUseCase,
  ) {}

  static new ({
    searchQuestionsUseCase,
    searchTagsUseCase,
  }: {
    searchQuestionsUseCase: ISearchQuestionsUseCase,
    searchTagsUseCase: ISearchTagsUseCase,
  }): SearchService {
    return new SearchService(
      searchQuestionsUseCase,
      searchTagsUseCase,
    );
  }

  searchQuestions (payload: SearchQuestionsInput): Promise<SearchQuestionsOutput> {
    return this.searchQuestionsUseCase.execute(payload);
  }
  
  searchTags (payload: SearchTagsInput): Promise<SerachTagsOutput> {
    return this.searchTagsUseCase.execute(payload);
  }
}