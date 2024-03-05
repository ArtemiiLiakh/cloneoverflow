import { PaginationResponse } from '../responses/pagination.response';

export class PaginatedData<D> {
  data: D[];
  pagination: PaginationResponse;
}