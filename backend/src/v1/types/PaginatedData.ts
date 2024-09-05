import { PaginationResponse } from '@cloneoverflow/common';

export class PaginatedData<D> {
  data: D[];
  pagination: PaginationResponse;
}