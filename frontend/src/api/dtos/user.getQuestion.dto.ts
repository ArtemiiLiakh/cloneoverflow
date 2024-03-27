import { PaginationDTO } from './pagination.dto';

export enum UserGQSortBy {
  DATE = 'date',
  RATE = 'rate',
  ANSWERS = 'answers',
}

export class UserGetQuestionsDTO {
  search?: string;
  tags?: string[];
  sortBy?: UserGQSortBy;
  orderBy?: 'asc' | 'desc';
  pagination?: PaginationDTO;
}