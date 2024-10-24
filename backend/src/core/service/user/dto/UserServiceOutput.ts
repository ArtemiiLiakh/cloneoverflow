import { Answer } from "@core/domain/entities/Answer";
import { Question } from "@core/domain/entities/Question";
import { User } from "@core/domain/entities/User";

export namespace UserServiceOutput {
  export type Get = User;
  export type Update = User;
  
  export type GetProfile = {
    user: User, 
    bestQuestion: Question | null,
    bestAnswer: Answer | null,
    questionsAmount: number;
    answersAmount: number;
  };
}