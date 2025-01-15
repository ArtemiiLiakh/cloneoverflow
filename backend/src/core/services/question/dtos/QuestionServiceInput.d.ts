import { OrderByEnum, PaginationDTO, QuestionsSortByEnum, VoteTypeEnum } from '@cloneoverflow/common';

export namespace QuestionServiceInput {
  export type Create = {
    executorId: string, 
    data: {
      title: string;
      text: string;
      tags?: string[];
    },
  };

  export type Update = {
    executorId: string, 
    questionId: string, 
    data: {
      title?: string;
      text?: string;
      tags?: string[];
    }
  };

  export type Get = {
    executorId?: string,
    questionId: string, 
  };

  export type GetAll = {
    search?: string;
    tags?: string[];
    sortBy?: QuestionsSortByEnum;
    orderBy?: OrderByEnum;
    pagination?: PaginationDTO;
    ownerId?: string;
    rateFrom?: number;
    rateTo?: number;
  };

  export type Delete = {
    executorId: string
    questionId: string, 
  };

  export type OpenQuestion = {
    executorId: string,
    questionId: string, 
  };

  export type CloseQuestion = {
    executorId: string,
    questionId: string, 
    answerId: string,
  };

  export type VoteQuestion = {
    executorId: string, 
    questionId: string, 
    vote: VoteTypeEnum,
  };

  export type AddViewer = {
    executorId: string,
    questionId: string,
  };
}