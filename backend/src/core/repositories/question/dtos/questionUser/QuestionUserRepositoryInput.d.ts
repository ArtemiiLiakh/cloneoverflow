import { QuestionUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/models/QuestionUser';
import { QuestionUserWhere } from '../Params';

export namespace QuestionUserRepositoryInput {
  export type GetOne = {
    where: QuestionUserWhere
  };

  export type Create = {
    user: QuestionUser,
    returnId?: true,
  };

  export type Update = {
    questionUserId: string, 
    data: {
      status?: QuestionUserStatusEnum,
      voteType?: VoteTypeEnum | null
    },
    returnEntity?: boolean;
  };

  export type Delete = {
    questionUserId: string,
  };
}
