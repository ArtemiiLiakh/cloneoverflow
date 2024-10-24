import { PaginationResponse } from "@cloneoverflow/common";

export interface PaginatedData<D> {
  data: D[];
  pagination: PaginationResponse;
}