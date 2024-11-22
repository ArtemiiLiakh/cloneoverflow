import { UserRelation } from '@common/relations/UserRelation';
import { CountResult } from '@common/repository/counts';
import { SelectResult } from '@common/repository/select';
import { User, UserCreds } from '@core/domain/entities/User';
import { UserRepositoryInput } from '../input/UserRepositoryInput';

export namespace UserRepositoryOutput {
  type UserAdds = Partial<UserRelation & CountResult<UserRelation>>; 
  
  export type UserResponse<S extends UserRepositoryInput.UserSelect> = {
    entity: SelectResult<S, User>,
  } & UserAdds;

  export type FindById<
    S extends UserRepositoryInput.UserSelect = UserRepositoryInput.UserSelect,
  > = UserResponse<S> | null;
  
  export type FindByEmail<
    S extends UserRepositoryInput.UserSelect = UserRepositoryInput.UserSelect,
  > = UserResponse<S> | null;

  export type FindByUsername<
    S extends UserRepositoryInput.UserSelect = UserRepositoryInput.UserSelect,
  > = UserResponse<S> | null;

  export type FindOne<
    S extends UserRepositoryInput.UserSelect = UserRepositoryInput.UserSelect,
  > = UserResponse<S> | null;

  export type FindMany<
    S extends UserRepositoryInput.UserSelect = UserRepositoryInput.UserSelect,
  > = (UserResponse<S>)[];
  
  export type FindCreds = UserCreds | null;
  export type FindWithCreds = {
    user: User,
    creds: UserCreds,
  } | null;
  
  export type Count = number;
  export type Create = void;
  export type CreateWithCreds = void;
  export type Update = User;
  export type UpdateCreds = User;
  export type Delete = void;
}