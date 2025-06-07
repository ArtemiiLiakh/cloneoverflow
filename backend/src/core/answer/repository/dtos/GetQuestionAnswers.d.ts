import { PaginationOptions } from '@cloneoverflow/common';
import { PaginatedData } from '@common/repository/pagination';
import { AnswerDetails } from '@core/answer/AnswerDetails';
import { AnswerOrderByProps } from '../props/AnswerOrderByProps';

export type AnswerRepoGetQuestionAnswersInput = {
  questionId: string;
  voterId?: string,
  orderBy?: AnswerOrderByProps;
  pagination?: PaginationOptions;
}

export type AnswerRepoGetQuestionAnswersOutput = PaginatedData<AnswerDetails>;