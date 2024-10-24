import { UserRelation } from "@common/relations/UserRelation";
import { CountOption } from "@common/repository/counts";
import { IncludeRelations } from "@common/repository/include";
import { RepositoryFindManyOptions, RepositoryOptions } from "@common/repository/options";
import { OrderByOption } from "@common/repository/orderBy";
import { Where } from "@common/repository/where";
import { User, UserCreds } from "@core/domain/entities/User";

export namespace UserRepositoryInput {
  export type UserWhere = Where<User & UserRelation>;
  export type UserCredsWhere = Where<User & UserCreds & UserRelation>;

  export type UserInclude = IncludeRelations<UserRelation>;
  export type UserCount = CountOption<UserRelation>;
  export type UserOrderBy = OrderByOption<User & UserRelation>

  export type UserRepositoryOptions = RepositoryOptions<UserInclude, UserCount, UserOrderBy>;
  export type UserFindManyRepositoryOptions = RepositoryFindManyOptions<UserInclude, UserCount, UserOrderBy>;

  export type FindById = {
    id: string;
    options?: UserRepositoryOptions,
  };
  
  export type FindByUsername = {
    username: string;
    options?: UserRepositoryOptions,
  };
  
  export type FindOne = {
    where: UserWhere,
    options?: UserRepositoryOptions,
  };
  
  export type FindWithCreds = {
    where: UserCredsWhere,
    options?: UserRepositoryOptions,
  };
  
  export type FindMany = {
    where: UserWhere,
    options?: UserFindManyRepositoryOptions,
  };
  
  export type Count = {
    where: UserWhere
  };

  export type Create = {
    user: User, 
    creds: UserCreds,
  };

  export type Update = {
    id: string, 
    user: Partial<User>
  };

  export type UpdateCreds = {
    id: string, 
    creds: Partial<UserCreds>
  };
  
  export type Delete = {
    user: User,
  };
}