import { PaginatedData } from '@cloneoverflow/common';
import { User } from '@core/domain/entities/User';
import { UserCreds } from '@core/domain/entities/UserCreds';
import { UserCountsOutput, UserIncludeOutput, UserSelectOutput } from './Params';

export namespace UserRepositoryOutput {
  export type CreateWithCreds = void;

  export type GetById = User;
  export type GetByEmail = User | null;

  export type GetCreds = {
    creds: UserCreds,
    user?: User,
  } | null;

  export type GetUser = {
    entity: User, 
    counts?: UserCountsOutput,
  } & UserIncludeOutput;

  export type GetPartialUser = {
    entity: UserSelectOutput, 
    counts?: UserCountsOutput,
  } & UserIncludeOutput;

  export type GetPartialById = UserSelectOutput;

  export type GetMany = PaginatedData<{
    user: UserSelectOutput,
    counts?: UserCountsOutput,
  } & UserIncludeOutput>;

  export type IsExist = boolean;
  export type Update = User | undefined; 
  export type UpdateCreds = void;
  export type Delete = void;
  
  export type AddRating = void;
}