import { AnswerUser } from '@core/domain/entities/AnswerUser';

export namespace AnswerUserRepositoryOutput {
  export type GetOne = AnswerUser | null;
  export type Create = void;
  export type Update = AnswerUser | undefined;
  export type Delete = void;
}