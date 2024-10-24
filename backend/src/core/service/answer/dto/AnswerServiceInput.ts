import { AnswerCreateDTO, AnswersGetAllDTO, AnswerUpdateDTO, VoteType } from "@cloneoverflow/common";

export namespace AnswerServiceInput {
  export type Create = {
    ownerId: string, 
    data: AnswerCreateDTO
  };
  
  export type Update = {
    answerId: string, 
    ownerId: string, 
    data: AnswerUpdateDTO
  };
  
  export type Get = {
    answerId: string, 
    userId?: string
  };

  export type GetAll = AnswersGetAllDTO;
  
  export type Delete = {
    answerId: string, 
    userId: string
  };
  
  export type VoteAnswer = {
    answerId: string, 
    userId: string, vote: VoteType
  };
}