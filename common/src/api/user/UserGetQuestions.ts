import { PaginationInfo, PaginationOptions } from '@data/Pagination';
import { OrderByEnum } from '@enums/OrderBy';
import { QuestionsSortByEnum } from '@enums/sorts';
import { userPath } from './paths';

export const UserGetQuestionsPath = userPath+'/:userId/questions';

export interface UserGetQuestionsParams {
  userId: string;
}

export interface UserGetQuestionsQuery extends PaginationOptions {
  search?: string;
  tags?: string[];
  sortBy?: QuestionsSortByEnum;
  orderBy?: OrderByEnum;
}

export interface UserGetQuestionDataItem {
  id: string;
  title: string;
  rating: number;
  views: number;
  tags: string[];
  createdAt: string;
  isClosed: boolean;
  answersAmount: number;
}

export interface UserGetQuestionsResponse {
  questions: UserGetQuestionDataItem[];
  pagination: PaginationInfo;
}