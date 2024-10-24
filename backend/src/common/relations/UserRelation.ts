import { Answer } from "@core/domain/entities/Answer";
import { Question } from "@core/domain/entities/Question";

export interface UserRelation {
  questions: Question[],
  answers: Answer[],
}
