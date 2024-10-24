import { UserRelation } from "@common/relations/UserRelation";
import { CountResult } from "@common/repository/counts";
import { User, UserCreds } from "@core/domain/entities/User";

type UserAdds = Partial<UserRelation & CountResult<UserRelation>>; 

export namespace UserRepositoryOutput {
  export type FullUser = {
    entity: User
  } & UserAdds;

  export type FindById = FullUser | null;
  export type FindByUsername = FullUser | null;
  export type FindOne = FullUser | null;
  export type FindWithCreds = { user: User, creds: UserCreds } | null;
  export type FindMany = (FullUser)[];
  
  export type Count = number;
  export type Create = void;
  export type Update = User;
  export type UpdateCreds = User;
  export type Delete = void;
}