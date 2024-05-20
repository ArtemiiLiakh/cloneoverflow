import { Answer, Question, UserAnswers, UserProfile } from "@prisma/client";

export class DbAnswer implements Answer{
  id: string;
  questionId: string;
  rate: number;
  text: string;
  isSolution: boolean;
  createdAt: Date;
  updatedAt: Date;
  userAnswers: (UserAnswers & {
    userProfile: UserProfile;
  })[];
};

export class DbAnswerWithQuestion implements Answer{
  id: string;
  questionId: string;
  rate: number;
  text: string;
  isSolution: boolean;
  createdAt: Date;
  updatedAt: Date;
  question: Question;
};