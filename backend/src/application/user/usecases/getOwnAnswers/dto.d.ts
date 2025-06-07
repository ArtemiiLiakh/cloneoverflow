import { AnswersSortByEnum, OrderByEnum, PaginationOptions } from '@cloneoverflow/common';
import { PaginatedData } from '@common/repository/pagination';
import { Answer } from '@core/answer';

export type UserGetOwnAnswersInput = {
  userId: string,
  answerOptions?: {
    searchText?: string,
    sortBy?: AnswersSortByEnum,
    orderBy?: OrderByEnum,
    pagination?: PaginationOptions,  
  }
}

export type UserGetOwnAnswersOutput = PaginatedData<{
  answer: Answer,
  question: {
    id: string,
    title: string,
    rating: number,
  }
}>;