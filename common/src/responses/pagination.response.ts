import { PaginationOutput } from "../data/PaginationOutput";

export class PaginationResponse implements PaginationOutput {
  page: number;
  pageSize: number;
  totalPages: number;
  totalAmount: number;
  nextElems: number;
  prevElems: number;
}