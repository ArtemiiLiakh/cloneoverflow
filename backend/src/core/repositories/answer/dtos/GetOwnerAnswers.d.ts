import { PaginatedData, PaginationDTO } from '@cloneoverflow/common';
import { Answer } from '@core/models/answer';
import { AnswerOrderByProps } from './props/AnswerOrderByProps';

export type AnswerRepoGetOwnerAnswersInput = {
  ownerId: string,
  searchText?: string,
  orderBy?: AnswerOrderByProps,
  pagination?: PaginationDTO,
}

export type AnswerRepoGetOwnerAnswersOutput = PaginatedData<{
  answer: Answer,
  question: {
    id: string,
    title: string,
    rating: number,
  }
}>;