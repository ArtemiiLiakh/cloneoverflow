import { PaginationResponse } from "../responses";

export interface PaginatedData<D> {
  data: D[];
  pagination: PaginationResponse;
}