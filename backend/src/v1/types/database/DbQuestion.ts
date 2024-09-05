import { QuestionStatus, Tag } from '@cloneoverflow/common';
import { UserProfile, Answer, UserQuestions, Question, UserAnswers } from "@prisma/client";

export class QuestionUserRelation {
  userQuestions: (UserQuestions & {
    userProfile: UserProfile,
  })[];
}

export class QuestionUserAnswerRelation {
  answers: (Answer & {
    owner: UserProfile,
    userAnswers: (UserAnswers & {
      userProfile: UserProfile,
    })[];
  })[];
}

export class QuestionAnswerRelation {
  answers: (Answer & {
    owner: UserProfile,
  })[];
}

export class DbQuestion implements Question {
  id: string;
  title: string;
  text: string;
  rate: number;
  views: number;
  status: QuestionStatus;
  ownerId: string;
  owner: UserProfile;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

export class DbGetAllQuestions implements Question {
  id: string;
  ownerId: string;
  owner: UserProfile;
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