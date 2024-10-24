import { PaginatedData } from "@common/utils/PaginatedData";
import { Answer } from "@core/domain/entities/Answer";
import { AnswerUserStats } from "@core/domain/entities/AnswerUserStats";
import { User } from "@core/domain/entities/User";

export namespace AnswerServiceOutput {
  export type Create = Answer;
  export type Update = Answer;
  export type Delete = Answer;
  
  export type Get = {
    answer: Answer,
    owner: User,
    user: AnswerUserStats | undefined,
  };
  
  export type VoteAnswer = void;

  export type GetAll = PaginatedData<{
    entity: Answer,
    owner: User,
    questionId: string,
  }>;

}