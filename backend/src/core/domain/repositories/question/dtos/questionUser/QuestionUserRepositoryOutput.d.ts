import { QuestionUser } from '@core/domain/entities/QuestionUser';

export namespace QuestionUserRepositoryOutput {
  export type GetOne = QuestionUser | null;
  export type Create = void;
  export type Update = QuestionUser | undefined;
  export type Delete = void;
}