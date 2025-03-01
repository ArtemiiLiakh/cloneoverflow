import { OrderByEnum, PaginatedData, PaginationDTO, QuestionsSortByEnum } from '@cloneoverflow/common';
import { Tag } from '@core/models/Tag';

export type QuestionGetManyInput = {
  search?: string;
  tags?: string[];
  sortBy?: QuestionsSortByEnum;
  orderBy?: OrderByEnum;
  pagination?: PaginationDTO;
  ownerId?: string;
  rateFrom?: number;
  rateTo?: number;
};

export type QuestionGetManyOutput = PaginatedData<{ 
  entity: {
    id: string,
    ownerId: string,
    title: string,
    rating: number,
    views: number,
    isClosed: boolean,
    createdAt: Date,
  },
  owner?: {
    id: string,
    username: string,
    name: string,
    rating: number,
  } | null,
  tags?: Tag[],
  answerAmount?: number 
}>;