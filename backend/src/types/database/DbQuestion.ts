import { QuestionStatus, Tag } from '@cloneoverflow/common';
import { UserProfile, Answer, UserQuestions, Question, UserAnswers } from "@prisma/client";

export class DbQuestion implements Question {
  id: string;
  title: string;
  text: string;
  rate: number;
  views: number;
  status: QuestionStatus;
  userQuestions: (UserQuestions & {
    userProfile: UserProfile,
  })[];
  answers: (Answer & {
    userAnswers: (UserAnswers & {
      userProfile: UserProfile,
    })[],
  })[];
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

export class DbGetAllQuestions implements Question {
  id: string;
  userQuestions: (UserQuestions & {
    userProfile: UserProfile,
  })[];
  title: string;
  text: string;
  rate: number;
  views: number;
  status: QuestionStatus;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  _count: {
    answers: number;
  };
}