import { PaginationOptions } from '@cloneoverflow/common';
import { PaginatedData } from '@common/repository/pagination';
import { WhereInput } from '@common/repository/where';
import { Nullable } from '@common/utils/classTypes';
import { Question, QuestionOwner } from '@core/question';
import { Tag } from '@core/tag';
import { SearchQuestionOrderByProps } from '../props/SearchQuestionOrderByProps';

export type QuestionRepoSearchWhereProps = Partial<{
  searchText: string,
  authors: string[],
  tags: string[],
  keywords: string[],
  rating: {
    ls?: number,
    gt?: number,
  },
  views: {
    ls?: number,
    gt?: number,
  },
  favorite: {
    userId: string, 
  },
  isClosed: boolean,
  createdAt: {
    ls?: Date,
    gt?: Date,
  },
}>

export type QuestionRepoSearchOutputProps = {
  question: Question,
  owner: Nullable<QuestionOwner>,
  tags: Tag[],
  answersAmount: number,
}

export type QuesitonRepoSearchInput = {
  where: WhereInput<QuestionRepoSearchWhereProps>,
  orderBy?: SearchQuestionOrderByProps,
  pagination?: PaginationOptions,
}

export type QuestionRepoSearchOutput = PaginatedData<QuestionRepoSearchOutputProps>;