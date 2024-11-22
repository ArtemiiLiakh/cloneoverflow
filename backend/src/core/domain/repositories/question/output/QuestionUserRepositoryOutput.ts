import { QuestionUserStats } from '@core/domain/entities/QuestionUserStats';

export namespace QuestionUserRepositoryOutput {
  export type FindOne = QuestionUserStats | null;
  export type Create = void;
  export type Update = QuestionUserStats;
  export type Delete = void;
}