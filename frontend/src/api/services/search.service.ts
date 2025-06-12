import { SearchQuestionsQuery, SearchQuestionsResponse, SearchTagsQuery, SearchTagsResponse } from '@cloneoverflow/common/api/search';
import api from '..';
import urls from '../urls';

export class SearchService {
  static searchQuestion (query: SearchQuestionsQuery): Promise<SearchQuestionsResponse> {
    return api.get(urls.searchQuestion, {
      params: query,
    }).then((res) => res.data);
  }

  static searchTags (query: SearchTagsQuery): Promise<SearchTagsResponse> {
    return api.get(urls.searchTags, {
      params: query,
    }).then((res) => res.data);
  }
}