import { AnswerUserStats } from "@core/domain/entities/AnswerUserStats";

export namespace AnswerUserRepositoryOutput {
  export type FindOne = AnswerUserStats | null;
  export type Create = void;
  export type Update = AnswerUserStats;
  export type Delete = void;
}