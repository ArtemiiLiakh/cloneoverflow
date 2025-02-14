import {
  SearchQuestionsInput,
  SearchQuestionsOutput,
  SearchTagsInput,
  SerachTagsOutput,
} from '@core/services/search/dtos';

import {
  ISearchQuestionsUseCase,
  ISearchTagsUseCase,
} from '@core/services/search/types';

export class SearchServiceFacade {
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
  }) {
    return new SearchServiceFacade(
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