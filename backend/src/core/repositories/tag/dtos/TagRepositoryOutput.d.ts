import { PaginatedData } from '@cloneoverflow/common';
import { Tag } from '@core/models/Tag';
import { TagCountOutput, TagSelectOutput } from './Params';

export namespace TagsRepositoryOutput {
  export type GetTag = Tag;
  
  export type GetMany = PaginatedData<{
    entity: TagSelectOutput,
    counts?: TagCountOutput,
  }>;
  
  export type IsExist = boolean;

  export type Create = string | undefined;
  export type CreateMany = void;
  export type CreateOrFindMany = Tag[];
  
  export type Update = Tag | undefined;
  export type Delete = void;
}