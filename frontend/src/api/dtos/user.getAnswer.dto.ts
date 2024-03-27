import { PaginationDTO } from './pagination.dto';

export enum UserGASortBy {
  RATE = 'rate',
  DATE = 'date',
  SOLUTION = 'solution',
}

export class UserGetAnswersDTO {
  sortBy?: UserGASortBy
  orderBy?: 'asc' | 'desc';
  questionTitle?: string;
  pagination?: PaginationDTO;
}