import { Answer } from "@core/domain/entities/Answer";
import { QuestionUserStats } from "@core/domain/entities/QuestionUserStats";
import { Tag } from "@core/domain/entities/Tag";
import { User } from "@core/domain/entities/User";

export interface QuestionRelation {
  owner: User,
  users: QuestionUserStats[],
  answers: Answer[],
  tags: Tag[],
}