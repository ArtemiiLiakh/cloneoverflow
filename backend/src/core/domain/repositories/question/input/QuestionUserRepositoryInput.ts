import { VoteType } from "@cloneoverflow/common";
import { UserQuestionStatusEnum } from "@common/enums/UserQuestionStatus";
import { QuestionUserStats } from "@core/domain/entities/QuestionUserStats";

export namespace QuestionUserRepositoryInput {
  export type QuestionUserWhere = Partial<QuestionUserStats>;

  export type FindOne = {
    where: QuestionUserWhere
  };

  export type Create = {
    user: QuestionUserStats
  };

  export type Update = {
    where: QuestionUserWhere, 
    data: {
      status?: UserQuestionStatusEnum,
      voteType?: VoteType | null
    }
  };

  export type Delete = {
    questionUser: QuestionUserStats, 
  };
}
