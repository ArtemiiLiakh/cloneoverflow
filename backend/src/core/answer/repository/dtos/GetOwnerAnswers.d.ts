import { Answer } from '@core/answer';
import { AnswerOrderByProps } from '../props/AnswerOrderByProps';
import { PaginationOptions } from '@cloneoverflow/common';
import { PaginatedData } from '@common/repository/pagination';

export type AnswerRepoGetOwnerAnswersInput = {
  ownerId: string,
  searchText?: string,
  orderBy?: AnswerOrderByProps,
  pagination?: PaginationOptions,
}

export type AnswerRepoGetOwnerAnswersOutput = PaginatedData<{
  answer: Answer,
  question: {
    id: string,
    title: string,
    rating: number,
  }
}>;