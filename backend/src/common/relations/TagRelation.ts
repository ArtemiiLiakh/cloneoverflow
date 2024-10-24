import { Question } from "@core/domain/entities/Question";

export interface TagRelation {
  questions: Question[];
}