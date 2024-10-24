import { PaginationDTO } from "@cloneoverflow/common";
import { TagRelation } from "@common/relations/TagRelation";
import { CountOption } from "@common/repository/counts";
import { IncludeRelations } from "@common/repository/include";
import { RepositoryFindManyOptions, RepositoryOptions } from "@common/repository/options";
import { OrderByOption } from "@common/repository/orderBy";
import { Where } from "@common/repository/where";
import { Tag } from "@core/domain/entities/Tag";

export namespace TagRepositoryInput {
  export type TagWhere = Where<Tag & TagRelation>
  export type TagInclude = IncludeRelations<TagRelation>;
  export type TagCount = CountOption<TagRelation>;
  export type TagOrderBy = OrderByOption<Tag & TagRelation>

  export type TagRepositoryOptions = RepositoryOptions<TagInclude, TagCount, TagOrderBy>;
  export type TagFindManyRepositoryOptions = RepositoryFindManyOptions<TagInclude, TagCount, TagOrderBy>;

  export type FindById = {
    id: string, 
    options?: TagRepositoryOptions
  };

  export type FindOne = {
    where: TagWhere, 
    options?: TagRepositoryOptions
  };

  export type FindMany = {
    where: TagWhere, 
    options?: TagFindManyRepositoryOptions
  };

  export type Paginate = {
    where: TagWhere, 
    pagination?: PaginationDTO, 
    options?: TagFindManyRepositoryOptions
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
  };

  export type Delete = {
    tag: Tag,
  };

  export type DeleteMany = {
    where: TagWhere,
  };
}