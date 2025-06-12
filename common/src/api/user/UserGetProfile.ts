import { UserStatusEnum } from '@enums/statuses/UserStatus';
import { userPath } from './paths';

export const UserGetProfilePath = userPath+'/:userId/profile';

export interface UserGetProfileParams {
  userId: string;
}

interface BestUserAnswer {
  id: string;
  rating: number;
  isSolution: boolean;
  createdAt: string;
  question: {
    id: string;
    title: string;
    rating: number;
  };
}

interface BestUserQuestion {
  id: string;
  title: string;
  rating: number;
  isClosed: boolean;
  tags: string[];
  answersAmount: number;
  createdAt: string;
}

export interface UserGetProfileResponse {
  id: string;
  name: string;
  username: string;
  rating: number;
  about: string;
  status: UserStatusEnum;
  createdAt: string;
  updatedAt: string;
  answerAmount: number;
  questionAmount: number;
  bestAnswer: BestUserAnswer | null;
  bestQuestion: BestUserQuestion | null;
}