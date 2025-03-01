import { PaginatedData } from '@cloneoverflow/common';
import { Answer } from '@core/models/Answer';
import { AnswerIncludeOutput, AnswerSelectOutput } from './Params';

export namespace AnswerRepositoryOutput {
  export type GetById = Answer;
  export type GetAnswer = {
    entity: Answer,
  } & AnswerIncludeOutput;

  export type GetPartialAnswer = {
    entity: AnswerSelectOutput,
  } & AnswerIncludeOutput;
  
  export type GetPartialById = AnswerSelectOutput;

  export type GetMany = PaginatedData<{
    entity: AnswerSelectOutput,
  } & AnswerIncludeOutput>;

  export type IsExist = boolean;

  export type Count = number;
  export type Create = string | undefined;
  export type Update = Answer | undefined;
  export type Delete = void;
  export type MarkSolution = void;
  export type UnmarkSolution = void;
  export type AddRating = void;
}