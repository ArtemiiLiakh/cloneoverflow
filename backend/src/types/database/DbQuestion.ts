import { QuestionStatus, Tag } from '@clone-overflow/common';
import { UserProfile, Answer } from "@prisma/client";

export class DbQuestion {
  id: string;
  userId: string;
  userProfile: UserProfile;
  title: string;
  text: string;
  rate: number;
  status: QuestionStatus;
  answers: Answer[];
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

export class DbGetAllQuestions {
  id: string;
  userId: string;
  userProfile: UserProfile;
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