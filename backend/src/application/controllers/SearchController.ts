import { 
  SearchQuestionsMapperOutput, 
  SearchTagsMapperOutput,
} from '@application/adapters/mappers/search';

import {
  SearchQuestionsDTO,
  SearchQuestionsResponse,
  SearchTagsDTO,
  SearchTagsReponse,
} from '@cloneoverflow/common';

import { SearchServiceFacade } from '@application/facades/SearchServiceFacade';
import { WithQuery } from './types/Request';
import { CoreResponse } from './types/Response';

export class SearchController {
  constructor (
    private searchService: SearchServiceFacade,
  ) {}

  async searchQuestions (
    { query }: WithQuery<SearchQuestionsDTO>, 
    res: CoreResponse<SearchQuestionsResponse>,
  ): Promise<void> {
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
  ): Promise<void> {
    const tags = await this.searchService.searchTags({
      name: query.name,
      orderBy: query.orderBy,
      sortBy: query.sortBy,
      pagination: query.pagination,
    });
    res.send(SearchTagsMapperOutput(tags));
  }
}