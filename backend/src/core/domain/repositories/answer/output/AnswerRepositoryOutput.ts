import { PaginatedData } from "@cloneoverflow/common";
import { AnswerRelation } from "@common/relations/AnswerRelation";
import { CountResult } from "@common/repository/counts";
import { Answer } from "@core/domain/entities/Answer";

type AnswerAdds = Partial<AnswerRelation & CountResult<AnswerRelation>>;

export namespace AnswerRepositoryOutput {
  export type FullAnswer = {
    entity: Answer,
  } & AnswerAdds;

  export type FindById = FullAnswer | null;
  export type FindOne = FullAnswer | null;
  export type FindMany = FullAnswer[];
  export type Paginate = PaginatedData<FullAnswer>;
  
  export type Count = number;
  export type Create = void;
  export type Update = Answer;
  export type UpdateMany = void;
  export type Delete = void;
}