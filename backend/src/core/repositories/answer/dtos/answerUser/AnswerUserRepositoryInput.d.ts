import { AnswerUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerUser } from '@core/models/AnswerUser';
import { AnswerUserWhere } from '../Params';

export namespace AnswerUserRepositoryInput {
  export type GetOne = {
    where: AnswerUserWhere
  };

  export type Create = {
    user: AnswerUser,
    returnId?: true,
  };

  export type Update = {
    answerUserId: string, 
    data: {
      status?: AnswerUserStatusEnum,
      voteType?: VoteTypeEnum | null,
    },
    returnEntity?: true;
  };

  export type Delete = {
    answerUserId: string, 
  };
}