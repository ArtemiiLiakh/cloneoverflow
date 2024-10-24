import { SearchQuestionsDTO, SearchTagsDTO } from "@cloneoverflow/common";
import { SearchQuestionsUseCase } from "@core/service/search/usecase/searchQuestions";
import { SearchTagsUseCase } from "@core/service/search/usecase/searchTags";
import { WithQuery } from "./types/Request";
import { CoreResponse } from "./types/Response";
import { SearchServiceFacade } from "@app/services/SearchServiceFacade";

export class SearchController {
  constructor (
    private searchService: SearchServiceFacade,
  ) {}

  async searchQuestions(
    { query }: WithQuery<SearchQuestionsDTO>, 
    res: CoreResponse
  ) {
    const questions = await this.searchService.searchQuestions(query);
    res.send(questions);
  }

  async searchTags(
    { query }: WithQuery<SearchTagsDTO>, 
    res: CoreResponse
  ) {
    const tags = await this.searchService.searchTags(query);
    res.send(tags);
  }
}