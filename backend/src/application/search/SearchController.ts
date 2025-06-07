import {
  SearchQuestionsMapperOutput,
  SearchTagsMapperOutput,
} from '@application/search/adapters';

import { SearchService } from '@application/search/SearchService';
import { SearchQuestionsQuery, SearchQuestionsResponse, SearchTagsQuery, SearchTagsResponse } from '@cloneoverflow/common/api/search';
import { WithOptionalAuth, WithQuery } from '@common/controllers/Request';
import { CoreResponseData } from '@common/controllers/Response';

export class SearchController {
  constructor (
    private searchService: SearchService,
  ) {}

  async searchQuestions (
    { executor, query }: WithOptionalAuth & WithQuery<SearchQuestionsQuery>, 
  ): Promise<CoreResponseData<SearchQuestionsResponse>> {
    const questions = await this.searchService.searchQuestions({
      executorId: executor?.userId,
      search: query.search,
      filterBy: query.filterBy,
      orderBy: query.orderBy,
      sortBy: query.sortBy,
      pagination: {
        page: query.page,
        pageSize: query.pageSize,
      },
    });
    return {
      data: SearchQuestionsMapperOutput(questions),
    };
  }

  async searchTags (
    { query }: WithQuery<SearchTagsQuery>, 
  ): Promise<CoreResponseData<SearchTagsResponse>> {
    const tags = await this.searchService.searchTags({
      name: query.name,
      orderBy: query.orderBy,
      sortBy: query.sortBy,
      pagination: {
        page: query.page,
        pageSize: query.pageSize,
      },
    });
    return {
      data: SearchTagsMapperOutput(tags),
    };
  }
}