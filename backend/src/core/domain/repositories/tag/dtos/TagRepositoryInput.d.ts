import { PaginationDTO } from '@cloneoverflow/common';
import { TagCountInput, TagOrderBy, TagWhere } from './Params';
import { Tag } from '@core/domain/entities/Tag';

export namespace TagRepositoryInput {
  export type GetTag = { 
    where: TagWhere 
    orderBy?: TagOrderBy,
    counts?: TagCountInput,
  };

  export type GetMany = { 
    where: TagWhere 
    orderBy?: TagOrderBy,
    counts?: TagCountInput,
    pagination?: PaginationDTO,
  };

  export type IsExist = {
    tagId?: string,
    name?: string,
  };

  export type Create = { tag: Tag };
  export type CreateMany = { tags: Tag[] };
  export type CreateOrFindMany = { tags: string[] };
  
  export type Update = { 
    tagId: string, 
    name: string
    returnEntity?: boolean;
  };

  export type Delete = { tagId: string };
}