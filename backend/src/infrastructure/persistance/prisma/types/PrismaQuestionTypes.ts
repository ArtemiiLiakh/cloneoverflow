import { Answer, Question, Tag, User, UserQuestions } from '@prisma/client';

export type PrismaQuestionType = Question & {
  owner?: User;
  userQuestions?: UserQuestions[];
  answers?: Answer[];
  tags?: Tag[];  
  _count?: {
    userQuestions?: number,
    answers?: number,
    tags?: number,
  };
}