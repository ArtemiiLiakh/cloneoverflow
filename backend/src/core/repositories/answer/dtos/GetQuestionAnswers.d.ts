import { PaginatedData, PaginationDTO } from '@cloneoverflow/common';
import { AnswerDetails } from '@core/models/answer/AnswerDetails';
import { AnswerOrderByProps } from './props/AnswerOrderByProps';

export type AnswerRepoGetQuestionAnswersInput = {
  questionId: string;
  voterId?: string,
  orderBy?: AnswerOrderByProps;
  pagination?: PaginationDTO;
}

export type AnswerRepoGetQuestionAnswersOutput = PaginatedData<AnswerDetails>;