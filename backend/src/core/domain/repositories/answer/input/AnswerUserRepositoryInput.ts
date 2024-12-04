import { AnswerUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerUserStats } from '@core/domain/entities/AnswerUserStats';

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
      status?: AnswerUserStatusEnum,
      voteType?: VoteTypeEnum | null,
    },
    returnEntity?: boolean;
  };

  export type Delete = {
    answerUser: AnswerUserStats, 
  };
}