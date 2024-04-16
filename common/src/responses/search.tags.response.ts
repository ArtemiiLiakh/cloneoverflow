import { PaginationResponse } from "./pagination.response";

export class MappedSearchTagsResponse {
  id: string;
  name: string;
  questionsAmount: number;
  createdAt: Date;
}

export class SearchTagsReponse {
  tags: MappedSearchTagsResponse[];
  pagination: PaginationResponse;
}