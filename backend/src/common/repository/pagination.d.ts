import { PaginationInfo } from '@cloneoverflow/common';

export interface PaginatedData<TData> {
  data: TData[],
  pagination: PaginationInfo,
}