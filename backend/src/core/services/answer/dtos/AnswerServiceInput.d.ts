import { AnswersSortByEnum, OrderByEnum, PaginationDTO, VoteTypeEnum } from '@cloneoverflow/common';

export namespace AnswerServiceInput {
  export type Create = {
    executorId: string, 
    questionId: string;
    text: string;
  };
  
  export type Update = {
    executorId: string, 
    answerId: string, 
    text: string,
  };
  
  export type Get = {
    executorId?: string,
    answerId: string, 
  };

  export type GetAll = {
    executorId?: string,
    questionId?: string;
    sortBy?: AnswersSortByEnum;
    orderBy?: OrderByEnum;
    pagination?: PaginationDTO;
    searchText?: string;
    ownerId?: string;
    rateFrom?: number;
    rateTo?: number;
  };
  
  export type Delete = {
    executorId: string
    answerId: string, 
  };
  
  export type VoteAnswer = {
    executorId: string, 
    answerId: string, 
    vote: VoteTypeEnum,
  };
}