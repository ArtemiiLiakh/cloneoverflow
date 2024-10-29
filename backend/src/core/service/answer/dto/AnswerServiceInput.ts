import { AnswerIncludeEnum, AnswersSortByEnum, OrderByEnum, PaginationInput, VoteTypeEnum } from "@cloneoverflow/common";

export namespace AnswerServiceInput {
  export type Create = {
    ownerId: string, 
    data: {
      questionId: string;
      text: string;
    }
  };
  
  export type Update = {
    answerId: string, 
    ownerId: string, 
    data: {
      text: string,
    },
  };
  
  export type Get = {
    answerId: string, 
    userId?: string,
    include?: AnswerIncludeEnum[],
  };

  export type GetAll = {
    sortBy?: AnswersSortByEnum;
    orderBy?: OrderByEnum;
    pagination?: PaginationInput;
    searchText?: string;
    ownerId?: string;
    rateFrom?: number;
    rateTo?: number;
  };
  
  export type Delete = {
    answerId: string, 
    userId: string
  };
  
  export type VoteAnswer = {
    answerId: string, 
    userId: string, 
    vote: VoteTypeEnum,
  };
}