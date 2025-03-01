import { AnswerUser } from '@core/models/AnswerUser';

export namespace AnswerUserRepositoryOutput {
  export type GetOne = AnswerUser | null;
  export type Create = string | undefined;
  export type Update = AnswerUser | undefined;
  export type Delete = void;
}