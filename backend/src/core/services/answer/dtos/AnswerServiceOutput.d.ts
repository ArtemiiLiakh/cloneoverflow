import { PaginatedData } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerUser } from '@core/domain/entities/AnswerUser';

export namespace AnswerServiceOutput {
  export type Create = Answer;
  export type Update = Answer;
  export type Delete = Answer;
  
  export type Get = {
    entity: Answer,
    owner?: {
      id: string,
      username: string,
      name: string,
      rating: number,
    },
    question?: {
      id: string,
      ownerId: string,
      title: string,
      rating: number,
      isClosed: boolean,
    },
    voter?: AnswerUser,
  };
  
  export type VoteAnswer = void;

  export type GetAll = PaginatedData<{
    entity: Answer,
    owner: {
      id: string,
      username: string,
      name: string,
      rating: number,
    },
    question: {
      id: string,
      ownerId: string,
      title: string,
      rating: number,
    },
  }>;
}