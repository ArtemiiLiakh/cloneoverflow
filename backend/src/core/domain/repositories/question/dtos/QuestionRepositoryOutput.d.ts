import { PaginatedData } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionCountOutput, QuestionIncludeOutput, QuestionSelectOutput } from './Params';

export namespace QuestionRepositoryOutput {
  export type GetById = Question | null;
  
  export type GetQuestion = {
    entity: Question,
    counts?: QuestionCountOutput,
  } & QuestionIncludeOutput | null;

  export type GetPartialQuestion = {
    entity: QuestionSelectOutput,
    counts?: QuestionCountOutput,
  } & QuestionIncludeOutput | null;
  
  export type GetMany = PaginatedData<{
    entity: QuestionSelectOutput,
    counts?: QuestionCountOutput,
  } & QuestionIncludeOutput>;

  export type IsExist = boolean;

  export type Create = void;
  export type Update = Question | undefined;
  export type Delete = void;
  export type Count = number;
  
  export type RefTags = void;
  export type UnrefTags = void;
  export type AddRating = void;
  export type AddViewer = void;

  export type OpenQuestion = void;
  export type CloseQuestion = void;
}