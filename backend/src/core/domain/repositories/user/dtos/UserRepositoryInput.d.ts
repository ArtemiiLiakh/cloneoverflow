import { PaginationDTO, VoteTypeEnum } from '@cloneoverflow/common';
import { User } from '@core/domain/entities/User';
import { UserCreds } from '@core/domain/entities/UserCreds';
import { UserCountsInput, UserIncludeInput, UserOrderBy, UserSelectInput, UserWhere } from './Params';

export namespace UserRepositoryInput {
  export type IsExist = UserWhere;
  export type ValidateById = { userId: string };

  export type CreateWithCreds = {
    user: User,
    creds: UserCreds
  };

  export type GetByEmail = { email: string };
  export type GetById = { userId: string };
  
  export type GetCreds = {
    where: {
      userId?: string,
      email?: string, 
    },
    withUser?: boolean,
  };

  export type GetUser = {
    where: UserWhere,
    counts?: UserCountsInput,
    include?: UserIncludeInput,
  }
  
  export type GetPartialUser = {
    where: UserWhere,
    select: UserSelectInput,
    counts?: UserCountsInput,
    include?: UserIncludeInput,
  }
  
  export type GetPartialById = {
    userId: string,
    select: UserSelectInput,
  }

  export type GetMany = {
    where?: UserWhere,
    select?: UserSelectInput,
    orderBy?: UserOrderBy,
    counts?: UserCountsInput,
    include?: UserIncludeInput,
    pagination?: PaginationDTO,
  }
  
  export type UpdateCreds = {
    userId: string,
    creds: {
      email?: string,
      password?: string,
    },
  };

  export type Update = {
    userId: string;
    user: {
      name?: string,
      username?: string,
      about?: string,
    },
    returnEntity?: true,
  };

  export type Delete = { userId: string };
  
  export type AddRating = { 
    userId: string,
    voteType: VoteTypeEnum,
  };
}