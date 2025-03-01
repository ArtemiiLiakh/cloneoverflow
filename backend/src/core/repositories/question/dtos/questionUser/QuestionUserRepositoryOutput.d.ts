import { QuestionUser } from '@core/models/QuestionUser';

export namespace QuestionUserRepositoryOutput {
  export type GetOne = QuestionUser | null;
  export type Create = string | undefined;
  export type Update = QuestionUser | undefined;
  export type Delete = void;
}