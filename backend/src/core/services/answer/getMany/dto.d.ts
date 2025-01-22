import { AnswersSortByEnum, OrderByEnum, PaginationDTO, PaginatedData } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';

export type AnswerGetManyInput = {
  questionId?: string;
  sortBy?: AnswersSortByEnum;
  orderBy?: OrderByEnum;
  pagination?: PaginationDTO;
  searchText?: string;
  ownerId?: string;
  rateFrom?: number;
  rateTo?: number;
};

export type AnswerGetManyOutput = PaginatedData<{
  entity: Answer,
  owner: {
    id: string,
    username: string,
    name: string,
    rating: number,
  } | null,
  question: {
    id: string,
    ownerId: string,
    title: string,
    rating: number,
  },
}>;