import { PaginatedData, PaginationDTO } from '@cloneoverflow/common';
import { Question } from '@core/models/question';
import { Tag } from '@core/models/tag';
import { QuestionOrderByProps } from './props/QuestionOrderByProps';

export type QuestionRepoGetOwnerQuestionsInput = {
  ownerId: string,
  searchText?: string,
  tags?: string[],
  orderBy?: QuestionOrderByProps,
  pagination?: PaginationDTO,
}

export type QuestionRepoGetOwnerQuestionsOutput = PaginatedData<{
  question: Question,
  tags: Tag[],
  answerAmount: number,
}>;