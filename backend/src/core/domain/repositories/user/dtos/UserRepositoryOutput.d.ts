import { PaginatedData } from '@cloneoverflow/common';
import { User, UserCreds } from '@core/domain/entities/User';
import { UserCountsOutput, UserIncludeOutput, UserSelectOutput } from './Params';

export namespace UserRepositoryOutput {
  export type CreateWithCreds = void;

  export type GetById = User | null;
  export type GetByEmail = User | null;
  export type GetByUsername = User | null;

  export type GetCreds = {
    creds: UserCreds,
    user?: User,
  } | null;

  export type GetUser = {
    entity: User, 
    counts?: UserCountsOutput,
  } & UserIncludeOutput | null

  export type GetPartialUser = {
    entity: UserSelectOutput, 
    counts?: UserCountsOutput,
  } & UserIncludeOutput | null

  export type GetMany = PaginatedData<{
    user: UserSelectOutput,
    counts?: UserCountsOutput,
  } & UserIncludeOutput>;

  export type IsExist = boolean;
  export type Update = User | undefined; 
  export type UpdateCreds = void;
  export type Delete = void;
}