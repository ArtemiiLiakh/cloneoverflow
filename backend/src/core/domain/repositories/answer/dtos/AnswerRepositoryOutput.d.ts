import { PaginatedData } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerIncludeOutput, AnswerSelectOutput } from './Params';

export namespace AnswerRepositoryOutput {
  export type GetById = Answer | null;
  export type GetAnswer = {
    entity: Answer,
  } & AnswerIncludeOutput | null;

  export type GetPartialAnswer = {
    entity: AnswerSelectOutput,
  } & AnswerIncludeOutput | null;

  export type GetMany = PaginatedData<{
    entity: AnswerSelectOutput,
  } & AnswerIncludeOutput>;

  export type IsExist = boolean;

  export type Count = number;
  export type Create = void;
  export type Update = Answer | undefined;
  export type Delete = void;
  export type MarkSolution = void;
  export type UnmarkSolution = void;
  export type AddRating = void;
}