import { SearchServiceInput } from "@core/service/search/dto/SearchServiceInput";
import { SearchServiceOutput } from "@core/service/search/dto/SearchServiceOutput";
import { SearchQuestionsUseCase } from "@core/service/search/usecase/searchQuestions";
import { SearchTagsUseCase } from "@core/service/search/usecase/searchTags";

export class SearchServiceFacade {
  constructor (
    private searchQuestionsUseCase: SearchQuestionsUseCase,
    private searchTagsUseCase: SearchTagsUseCase,
  ) {}

  searchQuestions(payload: SearchServiceInput.SearchQuestions): Promise<SearchServiceOutput.SearchQuestions> {
    return this.searchQuestionsUseCase.execute(payload);
  }
  
  searchTags(payload: SearchServiceInput.SearchTags): Promise<SearchServiceOutput.SerachTags> {
    return this.searchTagsUseCase.execute(payload)
  }
}