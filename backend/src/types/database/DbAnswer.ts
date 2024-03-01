import { Question, UserProfile } from "@prisma/client";

export class DbAnswer {
  id: string;
  userId: string;
  userProfile: UserProfile;
  questionId: string;
  question: Question;
  text: string;
  rate: number;
  isSolution: boolean;
  createdAt: Date;
  updatedAt: Date;
};