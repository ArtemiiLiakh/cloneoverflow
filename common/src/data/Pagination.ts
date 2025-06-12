export interface PaginationOptions {
  page?: number;
  pageSize?: number;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalPages: number;
  totalAmount: number;
  hasNext: boolean;
}