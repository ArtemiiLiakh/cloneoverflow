import { SearchServiceInput } from '@core/services/search/dtos/SearchServiceInput';
import { SearchServiceOutput } from '@core/services/search/dtos/SearchServiceOutput';
import { SearchQuestionsUseCase } from '@core/services/search/usecases/searchQuestions';
import { SearchTagsUseCase } from '@core/services/search/usecases/searchTags';

export class SearchServiceFacade {
  constructor (
    private searchQuestionsUseCase: SearchQuestionsUseCase,
    private searchTagsUseCase: SearchTagsUseCase,
  ) {}

  static new ({
    searchQuestionsUseCase,
    searchTagsUseCase,
  }: {
    searchQuestionsUseCase: SearchQuestionsUseCase,
    searchTagsUseCase: SearchTagsUseCase,
  }) {
    return new SearchServiceFacade(
      searchQuestionsUseCase,
      searchTagsUseCase,
    );
  }

  searchQuestions (payload: SearchServiceInput.SearchQuestions): Promise<SearchServiceOutput.SearchQuestions> {
    return this.searchQuestionsUseCase.execute(payload);
  }
  
  searchTags (payload: SearchServiceInput.SearchTags): Promise<SearchServiceOutput.SerachTags> {
    return this.searchTagsUseCase.execute(payload);
  }
}