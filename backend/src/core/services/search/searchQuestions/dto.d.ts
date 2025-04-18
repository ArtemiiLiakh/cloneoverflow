import { 
  SearchQuestionFilterByEnum, 
  SearchQuestionSortByEnum, 
  OrderByEnum, 
  PaginationDTO, 
  PaginatedData,
} from '@cloneoverflow/common';
import { Nullable } from '@common/utils/classTypes';
import { Tag } from '@core/models/tag/Tag';

export type SearchQuestionsInput = {
  executorId?: string,
  search?: string;
  filterBy?: SearchQuestionFilterByEnum;
  sortBy?: SearchQuestionSortByEnum;
  orderBy?: OrderByEnum;
  pagination?: PaginationDTO;
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