export interface PaginationResponse {
  page: number;
  pageSize: number;
  totalPages: number;
  totalAmount: number;
  nextElems: number;
  prevElems: number;
}