import { PaginatedData } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { Tag } from '@core/domain/entities/Tag';

export namespace QuestionServiceOutput {
  export type Create = Question;
  export type Update = Question;
  export type Delete = Question;
  
  export type Get = {
    entity: Question,
    tags?: Tag[],
    owner?: {
      id: string,
      username: string,
      name: string,
      rating: number,
    },
    voter: QuestionUser | null,
  };

  export type GetAll = PaginatedData<{ 
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
    },
    tags?: Tag[],
    answerAmount?: number 
  }>

  export type OpenQuestion = void;
  export type CloseQuestion = void;
  export type VoteQuestion = void;
  export type AddViewer = void;
}