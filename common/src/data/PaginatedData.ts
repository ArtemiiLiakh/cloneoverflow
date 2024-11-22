import { PaginationResponse } from './PaginationResponse';

export interface PaginatedData<D> {
  data: D[];
  pagination: PaginationResponse;
}