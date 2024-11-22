import { PaginationResponse } from '@data/PaginationResponse';

export interface MappedSearchTagsResponse {
  id: string;
  name: string;
  questionsAmount: number;
  createdAt: Date;
}

export interface SearchTagsReponse {
  tags: MappedSearchTagsResponse[];
  pagination: PaginationResponse;
}