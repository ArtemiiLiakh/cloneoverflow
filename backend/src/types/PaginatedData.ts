import { PaginationResponse } from '@clone-overflow/common';

export class PaginatedData<D> {
  data: D[];
  pagination: PaginationResponse;
}