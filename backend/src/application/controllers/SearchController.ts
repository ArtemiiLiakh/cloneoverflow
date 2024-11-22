import { SearchQuestionsMapperOutput } from '@application/adapters/mappers/search/SearchQuestionsMapper';
import { SearchTagsMapperOutput } from '@application/adapters/mappers/search/SearchTagsMapper';
import { SearchServiceFacade } from '@application/services/SearchServiceFacade';
import { SearchQuestionsDTO, SearchQuestionsResponse, SearchTagsDTO, SearchTagsReponse } from '@cloneoverflow/common';
import { WithQuery } from './types/Request';
import { CoreResponse } from './types/Response';

export class SearchController {
  constructor (
    private searchService: SearchServiceFacade,
  ) {}

  async searchQuestions (
    { query }: WithQuery<SearchQuestionsDTO>, 
    res: CoreResponse<SearchQuestionsResponse>,
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

  async searchTags (
    { query }: WithQuery<SearchTagsDTO>, 
    res: CoreResponse<SearchTagsReponse>,
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