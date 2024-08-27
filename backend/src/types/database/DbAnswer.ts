import { Answer, Question, UserAnswers, UserProfile } from "@prisma/client";

export class AnswerUserRelation {
  userAnswers: UserAnswers[];
}

export class DbAnswer implements Answer {
  id: string;
  questionId: string;
  ownerId: string;
  rate: number;
  text: string;
  isSolution: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: UserProfile;
};

export class DbAnswerWithQuestion implements Answer{
  id: string;
  questionId: string;
  ownerId: string;
  rate: number;
  text: string;
  isSolution: boolean;
  createdAt: Date;
  updatedAt: Date;
  question: Question;
  owner: UserProfile;
};