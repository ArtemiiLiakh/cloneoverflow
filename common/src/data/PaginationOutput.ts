export interface PaginationOutput {
  page: number;
  pageSize: number;
  totalPages: number;
  totalAmount: number;
  nextElems: number;
  prevElems: number;
}