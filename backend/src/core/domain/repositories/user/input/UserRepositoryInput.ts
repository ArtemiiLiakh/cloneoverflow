import { UserRelation } from '@common/relations/UserRelation';
import { CountOption } from '@common/repository/counts';
import { IncludeRelations } from '@common/repository/include';
import { RepositoryFindManyOptions, RepositoryOptions } from '@common/repository/options';
import { OrderByOption } from '@common/repository/orderBy';
import { Select } from '@common/repository/select';
import { Where } from '@common/repository/where';
import { User, UserCreds } from '@core/domain/entities/User';

export namespace UserRepositoryInput {
  export type UserSelect = Select<User>;
  export type UserWhere = Where<User & UserRelation>;
  export type UserCredsWhere = Where<User & UserCreds & UserRelation>;

  export type UserInclude = IncludeRelations<UserRelation>;
  export type UserCount = CountOption<UserRelation>;
  export type UserOrderBy = OrderByOption<User & UserRelation>

  export type FindById<
    Select=UserSelect, 
    Include=UserInclude, 
    Count=UserCount, 
    OrderBy=UserOrderBy,
  > = {
    id: string;
    options?: RepositoryOptions<Select, Include, Count, OrderBy>,
  };
  
  export type FindByEmail<
    Select=UserSelect, 
    Include=UserInclude, 
    Count=UserCount, 
    OrderBy=UserOrderBy,
  > = {
    email: string;
    options?: RepositoryOptions<Select, Include, Count, OrderBy>,
  };
  
  export type FindByUsername<
    Select=UserSelect, 
    Include=UserInclude, 
    Count=UserCount, 
    OrderBy=UserOrderBy,
  > = {
    username: string;
    options?: RepositoryOptions<Select, Include, Count, OrderBy>,
  };
  
  export type FindOne<
    Select=UserSelect, 
    Include=UserInclude, 
    Count=UserCount, 
    OrderBy=UserOrderBy,
  > = {
    where: UserWhere,
    options?: RepositoryOptions<Select, Include, Count, OrderBy>,
  };
  
  export type FindCreds = {
    where: UserCredsWhere,
  };
  
  export type FindWithCreds = {
    where: UserCredsWhere,
  };
  
  export type FindMany<
    Select=UserSelect, 
    Include=UserInclude, 
    Count=UserCount, 
    OrderBy=UserOrderBy,
  > = {
    where: UserWhere,
    options?: RepositoryFindManyOptions<Select, Include, Count, OrderBy>,
  };
  
  export type Count = {
    where: UserWhere
  };

  export type Create = {
    user: User, 
  };

  export type CreateWithCreds = {
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