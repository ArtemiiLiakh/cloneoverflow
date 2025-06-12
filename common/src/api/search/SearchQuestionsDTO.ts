import { PaginationInfo, PaginationOptions } from '@data/Pagination';
import { SearchQuestionFilterByEnum } from '@enums/filters';
import { OrderByEnum } from '@enums/OrderBy';
import { SearchQuestionSortByEnum } from '@enums/sorts';

export const SearchQuestionsPath = '/questions/search';

export interface SearchQuestionsQuery extends PaginationOptions {
  search?: string;
  filterBy?: SearchQuestionFilterByEnum;
  sortBy?: SearchQuestionSortByEnum;
  orderBy?: OrderByEnum;
}

export interface SearchQuestionDataItem {
  id: string;
  title: string;
  rating: number;
  views: number;
  isClosed: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    name: string;
    username: string;
    rating: number;
  } | null;  
  answersAmount: number;
}

export interface SearchQuestionsResponse {
  questions: SearchQuestionDataItem[];
  pagination: PaginationInfo;
}