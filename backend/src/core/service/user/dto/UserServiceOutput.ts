import { Answer } from '@core/domain/entities/Answer';
import { Question } from '@core/domain/entities/Question';
import { Tag } from '@core/domain/entities/Tag';
import { User } from '@core/domain/entities/User';

export namespace UserServiceOutput {
  export type Create = User;
  export type Get = {
    entity: User,
    answersAmount: number;
    questionsAmount: number;
  };
  export type Update = User;
  
  export type GetProfile = {
    user: User, 
    bestQuestion: {
      entity: Question,
      tags: Tag[],
      answersAmount: number,
    } | null,
    bestAnswer: {
      entity: Answer,
      question: Question,
    } | null,
    questionsAmount: number;
    answersAmount: number;
  };
}