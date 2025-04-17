import { AnswersSortByEnum, OrderByEnum, PaginatedData, PaginationDTO } from '@cloneoverflow/common';
import { Answer } from '@core/models/answer';

export type UserGetOwnAnswersInput = {
  userId: string,
  answerOptions?: {
    searchText?: string,
    sortBy?: AnswersSortByEnum,
    orderBy?: OrderByEnum,
    pagination?: PaginationDTO,  
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