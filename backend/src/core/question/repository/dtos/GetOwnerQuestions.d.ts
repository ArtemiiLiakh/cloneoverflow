import { PaginationOptions } from '@cloneoverflow/common';
import { PaginatedData } from '@common/repository/pagination';
import { Question } from '@core/question';
import { Tag } from '@core/tag';
import { QuestionOrderByProps } from '../props/QuestionOrderByProps';

export type QuestionRepoGetOwnerQuestionsInput = {
  ownerId: string,
  searchText?: string,
  tags?: string[],
  orderBy?: QuestionOrderByProps,
  pagination?: PaginationOptions,
}

export type QuestionRepoGetOwnerQuestionsOutput = PaginatedData<{
  question: Question,
  tags: Tag[],
  answerAmount: number,
}>;