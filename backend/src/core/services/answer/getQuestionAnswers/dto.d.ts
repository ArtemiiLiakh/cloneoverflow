import { AnswersSortByEnum, OrderByEnum, PaginatedData, PaginationDTO } from '@cloneoverflow/common';
import { AnswerDetails } from '@core/models/answer';

export type AnswerGetByQuestionInput = {
  questionId: string;
  voterId?: string;
  sortBy?: AnswersSortByEnum;
  orderBy?: OrderByEnum;
  pagination?: PaginationDTO;
};

export type AnswerGetByQuestionOutput = PaginatedData<AnswerDetails>;