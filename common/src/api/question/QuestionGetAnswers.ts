import { PaginationInfo, PaginationOptions } from '@data/Pagination';
import { OrderByEnum } from '@enums/OrderBy';
import { AnswersSortByEnum } from '@enums/sorts';
import { VoteTypeEnum } from '@enums/VoteType';
import { questionPath } from './paths';

export const QuestionGetAnswersPath = questionPath+'/:questionId/answers'

export interface QuestionGetAnswersParams {
  questionId: string;
}

export interface QuestionGetAnswersQuery extends PaginationOptions {
  sortBy?: AnswersSortByEnum;
  orderBy?: OrderByEnum;
}

export interface QuestionGetAnswersDataItem {
  id: string;
  questionId: string;
  text: string;
  rating: number;
  isSolution: boolean;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string,
    name: string,
    username: string,
    rating: number,
  } | null;
  myVoteType: VoteTypeEnum | null;
}

export interface QuestionGetAnswersResponse {
  answers: QuestionGetAnswersDataItem[];
  pagination: PaginationInfo;
}