import { UserAnswerStatusEnum, VoteTypeEnum } from "@cloneoverflow/common";
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
      voteType?: VoteTypeEnum | null,
    },
  };

  export type Delete = {
    answerUser: AnswerUserStats, 
  };
}