import { Answer, Question, User, UserAnswers } from "@prisma/client";

export type PrismaAnswerType = Answer & {
  userAnswers?: UserAnswers[],
  question?: Question,
  owner?: User,
  _count?: {
    userAnswers?: number,
  }
}