import { QuestionRelation } from "@common/relations/QuestionRelation";
import { CountResult } from "@common/repository/counts";
import { PaginatedData } from "@common/utils/PaginatedData";
import { Question } from "@core/domain/entities/Question";

type QuestionAdds = Partial<QuestionRelation & CountResult<QuestionRelation>>;

export namespace QuestionRepositoryOutput {
  export type FullQuestion = {
    entity: Question,
  } & QuestionAdds

  export type FindById = FullQuestion | null;
  export type FindOne = FullQuestion | null;
  export type FindMany = FullQuestion[];
  export type Paginate = PaginatedData<FullQuestion>;
  
  export type Count = number;
  export type VoteQuestion = void;
  
  export type Create = void;
  export type Update = Question;
  export type Delete = void;

  export type RefTags = void;
  export type UnrefTags = void;
}