import { SearchQuestionsDTO, SearchTagsDTO, SearchTagsReponse } from "@cloneoverflow/common";
import { WithQuery } from "./types/Request";
import { CoreResponse } from "./types/Response";
import { SearchServiceFacade } from "@app/services/SearchServiceFacade";
import { SearchTagsMapperOutput } from "@app/adapters/mappers/search/SearchTagsMapper";
import { SearchQuestionsMapperOutput } from "@app/adapters/mappers/search/SearchQuestionsMapper";

export class SearchController {
  constructor (
    private searchService: SearchServiceFacade,
  ) {}

  async searchQuestions(
    { query }: WithQuery<SearchQuestionsDTO>, 
    res: CoreResponse
  ) {
    const questions = await this.searchService.searchQuestions({
      search: query.search,
      filterBy: query.filterBy,
      orderBy: query.orderBy,
      sortBy: query.sortBy,
      pagination: query.pagination,
    });
    res.send(SearchQuestionsMapperOutput(questions));
  }

  async searchTags(
    { query }: WithQuery<SearchTagsDTO>, 
    res: CoreResponse<SearchTagsReponse>
  ) {
    const tags = await this.searchService.searchTags({
      name: query.name,
      orderBy: query.orderBy,
      sortBy: query.sortBy,
      pagination: query.pagination,
    });
    res.send(SearchTagsMapperOutput(tags));
  }
}