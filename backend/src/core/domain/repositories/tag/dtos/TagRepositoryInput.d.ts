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

  export type IsExist = TagWhere;
  export type ValidateById = { tagId: string };

  export type Create = { 
    tag: Tag,
    returnId?: true,
  };

  export type CreateMany = { tags: Tag[] };
  export type CreateOrFindMany = { tags: string[] };
  
  export type Update = { 
    tagId: string, 
    name: string
    returnEntity?: true;
  };

  export type Delete = { 
    tagId?: string,
    name?: string,
  };
}