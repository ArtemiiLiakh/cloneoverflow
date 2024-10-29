import { QuestionsSortByEnum, OrderByEnum, PaginationInput, VoteTypeEnum } from "@cloneoverflow/common";
import { QuestionIncludeEnum } from "@cloneoverflow/common/src/enums/includes/QuestionInclude";

export namespace QuestionServiceInput {
  export type Create = {
    ownerId: string, 
    data: {
      title: string;
      text: string;
      tags: string[];
    },
  };

  export type Update = {
    ownerId: string, 
    questionId: string, 
    data: {
      title?: string;
      text?: string;
      tags?: string[];
    }
  };

  export type Get = {
    questionId: string, 
    userId?: string,
    include?: QuestionIncludeEnum[],
  };

  export type GetAll = {
    search?: string;
    tags?: string[];
    sortBy?: QuestionsSortByEnum;
    orderBy?: OrderByEnum;
    pagination?: PaginationInput;
    ownerId?: string;
    rateFrom?: number;
    rateTo?: number;
  };

  export type Delete = {
    questionId: string, 
    userId: string
  };

  export type CloseQuestion = {
    questionId: string, 
    answerId: string, 
    userId: string,
  };

  export type VoteQuestion = {
    questionId: string, userId: string, 
    vote: VoteTypeEnum,
  };

  export type AddViewer = {
    userId: string,
    questionId: string,
  };
}