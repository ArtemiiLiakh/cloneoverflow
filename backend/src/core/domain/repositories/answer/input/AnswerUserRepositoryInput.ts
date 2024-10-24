import { VoteType } from "@cloneoverflow/common";
import { UserAnswerStatusEnum } from "@common/enums/UserAnswerStatus";
import { AnswerUserStats } from "@core/domain/entities/AnswerUserStats";

export namespace AnswerUserRepositoryInput {
  export type AnswerUserWhere = Partial<AnswerUserStats>;

  export type FindOne = {
    where: AnswerUserWhere
  };

  export type Create = {
    user: AnswerUserStats
  };

  export type Update = {
    where: AnswerUserWhere, 
    data: {
      status?: UserAnswerStatusEnum,
      voteType?: VoteType | null,
    },
  };

  export type Delete = {
    answerUser: AnswerUserStats, 
  };
}