import { PaginatedData } from "@cloneoverflow/common/src/data/PaginatedData";
import { Answer } from "@core/domain/entities/Answer";
import { AnswerUserStats } from "@core/domain/entities/AnswerUserStats";
import { Question } from "@core/domain/entities/Question";
import { User } from "@core/domain/entities/User";

export namespace AnswerServiceOutput {
  export type Create = Answer;
  export type Update = Answer;
  export type Delete = Answer;
  
  export type Get = {
    entity: Answer,
    owner?: User,
    question?: Question,
    user?: AnswerUserStats,
  };
  
  export type VoteAnswer = void;

  export type GetAll = PaginatedData<{
    entity: Answer,
    owner: User,
    question: Question,
    questionId: string,
  }>;

}