import { PaginatedData, PaginationDTO } from '@cloneoverflow/common';
import { WhereInput } from '@common/repository/where';
import { Question, QuestionOwner } from '@core/models/question';
import { Tag } from '@core/models/tag';
import { SearchQuestionOrderByProps } from './props/SearchQuestionOrderByProps';
import { Nullable } from '@common/utils/classTypes';

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
  pagination?: PaginationDTO,
}

export type QuestionRepoSearchOutput = PaginatedData<QuestionRepoSearchOutputProps>;