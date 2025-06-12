import { PaginationInfo, PaginationOptions } from '@data/Pagination';
import { OrderByEnum } from '@enums/OrderBy';
import { AnswersSortByEnum } from '@enums/sorts';
import { userPath } from './paths';

export const UserGetAnswersPath = userPath+'/:userId/answers';

export interface UserGetAnswersParams {
  userId: string;
}

export interface UserGetAnswersQuery extends PaginationOptions { 
  sortBy?: AnswersSortByEnum
  orderBy?: OrderByEnum;
  search?: string;
}

export interface UserGetAnswerDataItem {
  id: string;
  text: string;
  rating: number;
  isSolution: boolean;
  createdAt: string;
  updatedAt: string;
  question: {
    id: string;
    title: string;
    rating: number;
  };
}

export interface UserGetAnswersResponse {
  answers: UserGetAnswerDataItem[];
  pagination: PaginationInfo;
}