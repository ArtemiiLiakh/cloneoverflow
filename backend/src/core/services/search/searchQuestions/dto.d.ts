import { 
  SearchQuestionFilterByEnum, 
  SearchQuestionSortByEnum, 
  OrderByEnum, 
  PaginationDTO, 
  PaginatedData,
} from '@cloneoverflow/common';
import { Tag } from '@core/domain/entities/Tag';

export type SearchQuestionsInput = {
  search?: string;
  filterBy?: SearchQuestionFilterByEnum | SearchQuestionFilterByEnum[];
  sortBy?: SearchQuestionSortByEnum | SearchQuestionSortByEnum[];
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
  owner: {
    userId: string,
    name: string,
    username: string,
    rating: number,
  },
  tags: Tag[],
  answersAmount: number,
}>;