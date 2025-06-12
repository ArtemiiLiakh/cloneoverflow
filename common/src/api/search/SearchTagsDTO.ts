import { PaginationInfo, PaginationOptions } from '@data/Pagination';
import { OrderByEnum } from '@enums/OrderBy';
import { SearchTagsSortByEnum } from '@enums/sorts';

export const SearchTagsPath = '/tags/search';

export interface SearchTagsQuery extends PaginationOptions {
  name?: string;
  sortBy?: SearchTagsSortByEnum;
  orderBy?: OrderByEnum;
}

export interface SearchTagsDataItem {
  id: string;
  name: string;
  questionsAmount: number;
}

export interface SearchTagsResponse {
  tags: SearchTagsDataItem[];
  pagination: PaginationInfo;
}