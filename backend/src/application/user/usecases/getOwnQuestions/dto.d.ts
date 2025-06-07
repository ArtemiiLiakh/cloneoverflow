import { OrderByEnum, PaginationOptions, QuestionsSortByEnum } from '@cloneoverflow/common';
import { PaginatedData } from '@common/repository/pagination';
import { Question } from '@core/question';
import { Tag } from '@core/tag';

export type UserGetOwnQuestionsInput = {
  userId: string,
  questionOptions?: {
    searchText?: string,
    tags?: string[],
    sortBy?: QuestionsSortByEnum,
    orderBy?: OrderByEnum,
    pagination?: PaginationOptions,
  },
};

export type UserGetOwnQuestionsOutput = PaginatedData<{
  question: Question,
  tags: Tag[],
  answerAmount: number,
}>;