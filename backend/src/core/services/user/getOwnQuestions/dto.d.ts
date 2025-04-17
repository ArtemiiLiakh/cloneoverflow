import { OrderByEnum, PaginatedData, PaginationDTO, QuestionsSortByEnum } from '@cloneoverflow/common';
import { Question } from '@core/models/question';
import { Tag } from '@core/models/tag';

export type UserGetOwnQuestionsInput = {
  userId: string,
  questionOptions?: {
    searchText?: string,
    tags?: string[],
    sortBy?: QuestionsSortByEnum,
    orderBy?: OrderByEnum,
    pagination?: PaginationDTO,
  },
};

export type UserGetOwnQuestionsOutput = PaginatedData<{
  question: Question,
  tags: Tag[],
  answerAmount: number,
}>;