import { PaginatedData } from '@cloneoverflow/common';
import { QuestionRelation } from '@common/relations/QuestionRelation';
import { CountResult } from '@common/repository/counts';
import { Question } from '@core/domain/entities/Question';
import { QuestionRepositoryInput } from '../input/QuestionRepositoryInput';
import { SelectResult } from '@common/repository/select';


export namespace QuestionRepositoryOutput {
  type QuestionAdds = Partial<QuestionRelation & CountResult<QuestionRelation>>;
  
  export type QuestionResponse<S extends QuestionRepositoryInput.QuestionSelect> = {
    entity: SelectResult<S, Question>,
  } & QuestionAdds;

  export type FindById<
    S extends QuestionRepositoryInput.QuestionSelect = QuestionRepositoryInput.QuestionSelect,
  > = QuestionResponse<S> | null;

  export type FindOne<
    S extends QuestionRepositoryInput.QuestionSelect = QuestionRepositoryInput.QuestionSelect,
  > = QuestionResponse<S> | null;

  export type FindMany<
    S extends QuestionRepositoryInput.QuestionSelect = QuestionRepositoryInput.QuestionSelect,
  > = QuestionResponse<S>[];

  export type Paginate<
    S extends QuestionRepositoryInput.QuestionSelect = QuestionRepositoryInput.QuestionSelect,
  > = PaginatedData<QuestionResponse<S>>;
  
  export type Count = number;
  export type VoteQuestion = void;
  
  export type Create = void;
  export type Update = Question | undefined;
  export type Delete = void;

  export type RefTags = void;
  export type UnrefTags = void;
}