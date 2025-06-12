import {
  OrderByEnum,
  PaginationOptions,
  SearchQuestionFilterByEnum,
  SearchQuestionSortByEnum,
} from '@cloneoverflow/common';
import { PaginatedData } from '@common/repository/pagination';
import { Nullable } from '@common/utils/classTypes';
import { Tag } from '@core/tag/Tag';

export type SearchQuestionsInput = {
  executorId?: string,
  search?: string;
  filterBy?: SearchQuestionFilterByEnum;
  sortBy?: SearchQuestionSortByEnum;
  orderBy?: OrderByEnum;
  pagination?: PaginationOptions;
};

export type SearchQuestionsOutput = PaginatedData<{
  entity: {
    questionId: string,
    ownerId: string,
    title: string,
    rating: number,
    views: number,
    isClosed: boolean,
    createdAt: Date,
    updatedAt: Date,
  },
  owner: Nullable<{
    userId: string,
    name: string,
    username: string,
    rating: number,
  }>,
  tags: Tag[],
  answersAmount: number,
}>;