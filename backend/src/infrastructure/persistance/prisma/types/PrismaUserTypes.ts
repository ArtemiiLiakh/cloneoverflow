import { Answer, Question, User, UserAnswers, UserCreds, UserQuestions } from '@prisma/client';

export type PrismaUserType = User & {
  userCreds?: UserCreds,
  questions?: Question[],
  answers?: Answer[],
  userAnswers?: UserAnswers[],
  userQuestions?: UserQuestions[],
  _count?: {
    questions?: number,
    answers?: number,
    userAnswers?: number,
    userQuestions?: number,
  },
};

export type PrismaUserCredsType = UserCreds;

export type PrismaUserWithCredsType = UserCreds & {
  user?: User | null,
};