import { PaginationDTO } from '@cloneoverflow/common';
import { TagRelation } from '@common/relations/TagRelation';
import { CountOption } from '@common/repository/counts';
import { IncludeRelations } from '@common/repository/include';
import { RepositoryFindManyOptions, RepositoryOptions } from '@common/repository/options';
import { OrderByOption } from '@common/repository/orderBy';
import { Select } from '@common/repository/select';
import { Where } from '@common/repository/where';
import { Tag } from '@core/domain/entities/Tag';

export namespace TagRepositoryInput {
  export type TagSelect = Select<Tag>;
  export type TagWhere = Where<Tag & TagRelation>
  export type TagInclude = IncludeRelations<TagRelation>;
  export type TagCount = CountOption<TagRelation>;
  export type TagOrderBy = OrderByOption<Tag & TagRelation>

  export type FindById<
    Select=TagSelect, 
    Include=TagInclude, 
    Count=TagCount, 
    OrderBy=TagOrderBy,
  > = {
    id: string, 
    options?: RepositoryOptions<Select, Include, Count, OrderBy>
  };

  export type FindOne<
    Select=TagSelect, 
    Include=TagInclude, 
    Count=TagCount, 
    OrderBy=TagOrderBy,
  > = {
    where: TagWhere, 
    options?: RepositoryOptions<Select, Include, Count, OrderBy>
  };

  export type FindMany<
    Select=TagSelect, 
    Include=TagInclude, 
    Count=TagCount, 
    OrderBy=TagOrderBy,
  > = {
    where: TagWhere, 
    options?: RepositoryFindManyOptions<Select, Include, Count, OrderBy>
  };

  export type Paginate<
    Select=TagSelect, 
    Include=TagInclude, 
    Count=TagCount, 
    OrderBy=TagOrderBy,
  > = {
    where: TagWhere, 
    pagination?: PaginationDTO, 
    options?: RepositoryFindManyOptions<Select, Include, Count, OrderBy>
  };

  export type Count = {
    where: TagWhere, 
  };

  export type Create = {
    tag: Tag
  };

  export type CreateMany = {
    tags: Tag[]
  };

  export type CreateOrFindMany = {
    tags: string[]
  };

  export type Update = {
    id: string, 
    tag: Partial<Tag>
    returnEntity?: boolean;
  };

  export type Delete = {
    tag: Tag,
  };

  export type DeleteMany = {
    where: TagWhere,
  };
}