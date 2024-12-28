import { AnswerUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { AnswerUserWhere } from '../Params';

export namespace AnswerUserRepositoryInput {
  export type GetOne = {
    where: AnswerUserWhere
  };

  export type Create = {
    user: AnswerUser
  };

  export type Update = {
    answerUserId: string, 
    data: {
      status?: AnswerUserStatusEnum,
      voteType?: VoteTypeEnum | null,
    },
    returnEntity?: boolean;
  };

  export type Delete = {
    answerUserId: string, 
  };
}