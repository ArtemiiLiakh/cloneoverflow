import { TagRelation } from "@common/relations/TagRelation";
import { CountResult } from "@common/repository/counts"
import { PaginatedData } from "@common/utils/PaginatedData";
import { Tag } from "@core/domain/entities/Tag";

type TagAdds = Partial<TagRelation & CountResult<TagRelation>>;

export namespace TagsRepositoryOutput {
  export type FullTag = {
    entity: Tag,
  } & TagAdds;

  export type FindById = FullTag | null;
  export type FindOne = FullTag | null;
  export type FindMany = FullTag[];
  export type Paginate = PaginatedData<FullTag>;
  
  export type Count = number;
  export type Create = void;
  export type CreateMany = void;
  export type CreateOrFindMany = Tag[];
  export type Update = Tag;
  export type Delete = void;
  export type DeleteMany = void;
}