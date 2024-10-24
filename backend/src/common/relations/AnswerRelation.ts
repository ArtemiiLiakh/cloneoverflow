import { AnswerUserStats } from "@core/domain/entities/AnswerUserStats";
import { Question } from "@core/domain/entities/Question";
import { User } from "@core/domain/entities/User";

export interface AnswerRelation {
  owner: User,
  question: Question,
  users: AnswerUserStats[],
} 