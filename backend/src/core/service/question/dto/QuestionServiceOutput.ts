import { PaginatedData } from "@cloneoverflow/common/src/data/PaginatedData";
import { Answer } from "@core/domain/entities/Answer";
import { AnswerUserStats } from "@core/domain/entities/AnswerUserStats";
import { Question } from "@core/domain/entities/Question";
import { QuestionUserStats } from "@core/domain/entities/QuestionUserStats";
import { Tag } from "@core/domain/entities/Tag";
import { User } from "@core/domain/entities/User";

export namespace QuestionServiceOutput {
  export type Create = Question;
  export type Update = Question;
  export type Delete = Question;
  
  export type Get = {
    entity: Question,
    answers?: {
      entity: Answer,
      owner: User,
      user?: AnswerUserStats,
    }[],
    tags?: Tag[],
    owner?: User,
    user?: QuestionUserStats,
  };

  export type GetAll = PaginatedData<{ 
    entity: Question,
    owner?: User,
    tags?: Tag[],
    answerAmount?: number 
  }>

  export type CloseQuestion = void;
  export type VoteQuestion = void;
  export type AddViewer = QuestionUserStats;
}