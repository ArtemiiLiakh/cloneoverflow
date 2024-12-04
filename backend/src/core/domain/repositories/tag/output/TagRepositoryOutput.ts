import { PaginatedData } from '@cloneoverflow/common';
import { TagRelation } from '@common/relations/TagRelation';
import { CountResult } from '@common/repository/counts';
import { SelectResult } from '@common/repository/select';
import { Tag } from '@core/domain/entities/Tag';
import { TagRepositoryInput } from '../input/TagRepositoryInput';

type TagAdds = Partial<TagRelation & CountResult<TagRelation>>;

export namespace TagsRepositoryOutput {
  export type FullTag<S extends TagRepositoryInput.TagSelect> = {
    entity: SelectResult<S, Tag>,
  } & TagAdds;

  export type FindById<
    S extends TagRepositoryInput.TagSelect = TagRepositoryInput.TagSelect
  > = FullTag<S> | null;
  
  export type FindOne<
    S extends TagRepositoryInput.TagSelect = TagRepositoryInput.TagSelect
  > = FullTag<S> | null;
  
  export type FindMany<
    S extends TagRepositoryInput.TagSelect = TagRepositoryInput.TagSelect
  > = FullTag<S>[];

  export type Paginate<
    S extends TagRepositoryInput.TagSelect = TagRepositoryInput.TagSelect
  > = PaginatedData<FullTag<S>>;
  
  export type Count = number;
  export type Create = void;
  export type CreateMany = void;
  export type CreateOrFindMany = Tag[];
  export type Update = Tag | undefined;
  export type Delete = void;
  export type DeleteMany = void;
}