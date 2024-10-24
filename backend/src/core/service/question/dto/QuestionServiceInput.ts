import { QuestionCreateDTO, QuestionsGetAllDTO, QuestionUpdateDTO, VoteType } from "@cloneoverflow/common";

export namespace QuestionServiceInput {
  export type Create = {
    ownerId: string, 
    data: QuestionCreateDTO
  };

  export type Update = {
    ownerId: string, 
    questionId: string, 
    data: QuestionUpdateDTO
  };

  export type Get = {
    questionId: string, 
    userId?: string
  };

  export type GetAll = QuestionsGetAllDTO;

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
    vote: VoteType,
  };
}