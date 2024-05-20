import { QuestionStatus, Tag } from '@cloneoverflow/common';
import { UserProfile, Answer, UserQuestions, Question } from "@prisma/client";

export class DbQuestion implements Question {
  id: string;
  userId: string;
  title: string;
  text: string;
  rate: number;
  status: QuestionStatus;
  userQuestions: (UserQuestions & {
    userProfile: UserProfile,
  })[];
  answers: (Answer & {
    userProfile: UserProfile,
  })[];
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

export class DbGetAllQuestions implements Question {
  id: string;
  userId: string;
  userQuestions: (UserQuestions & {
    userProfile: UserProfile,
  })[];
  title: string;
  text: string;
  rate: number;
  status: QuestionStatus;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  _count: {
    answers: number;
  };
}