import { AnswersSortByEnum, OrderByEnum, PaginationOptions } from '@cloneoverflow/common';
import { PaginatedData } from '@common/repository/pagination';
import { AnswerDetails } from '@core/answer';

export type AnswerGetByQuestionInput = {
  questionId: string;
  voterId?: string;
  sortBy?: AnswersSortByEnum;
  orderBy?: OrderByEnum;
  pagination?: PaginationOptions;
};

export type AnswerGetByQuestionOutput = PaginatedData<AnswerDetails>;