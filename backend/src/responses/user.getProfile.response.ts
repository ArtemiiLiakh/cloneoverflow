import { Question, QuestionStatus, UserStatus } from '@prisma/client';

class MappedUserBestAnswer {
  id: string;
  text: string;
  rate: number;
  isSolution: boolean;
  createdAt: Date;
  question: {
    id: string;
    title: string;
  };
}

class MappedUserBestQuestion {
  id: string;
  title: string;
  rate: number;
  status: QuestionStatus;
  tags: string[];
  answersAmount: number;
  createdAt: Date;
}

export class UserGetProfileResponse {
  id: string;
  name: string;
  username: string;
  about: string | null;
  reputation: number;
  status: UserStatus;
  answersAmount: number;
  questionsAmount: number;
  bestAnswer: MappedUserBestAnswer | null;
  bestQuestion: MappedUserBestQuestion | null;
  createdAt: Date;
}