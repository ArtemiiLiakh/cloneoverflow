import { PaginatedData } from '@cloneoverflow/common';
import { AnswerRelation } from '@common/relations/AnswerRelation';
import { CountResult } from '@common/repository/counts';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerRepositoryInput } from '../input/AnswerRepositoryInput';
import { SelectResult } from '@common/repository/select';

export namespace AnswerRepositoryOutput {
  type AnswerAdds = Partial<AnswerRelation & CountResult<AnswerRelation>>;
  
  export type FullAnswer<S extends AnswerRepositoryInput.AnswerSelect> = {
    entity: SelectResult<S, Answer>,
  } & AnswerAdds;

  export type FindById<
    Select extends AnswerRepositoryInput.AnswerSelect = AnswerRepositoryInput.AnswerSelect,
  > = FullAnswer<Select> | null;

  export type FindOne<
    Select extends AnswerRepositoryInput.AnswerSelect = AnswerRepositoryInput.AnswerSelect,
  > = FullAnswer<Select> | null;

  export type FindMany<
    Select extends AnswerRepositoryInput.AnswerSelect = AnswerRepositoryInput.AnswerSelect,
  > = FullAnswer<Select>[];

  export type Paginate<
    Select extends AnswerRepositoryInput.AnswerSelect = AnswerRepositoryInput.AnswerSelect,
  > = PaginatedData<FullAnswer<Select>>;
  
  export type Count = number;
  export type Create = void;
  export type Update = Answer | undefined;
  export type UpdateMany = void;
  export type Delete = void;
}