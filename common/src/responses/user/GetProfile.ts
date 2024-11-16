import { UserStatusEnum } from '@enums/statuses/UserStatus';

export interface UserGetProfileResponse {
  id: string;
  name: string;
  username: string;
  about: string | null;
  reputation: number;
  status: UserStatusEnum;
  answersAmount: number;
  questionsAmount: number;
  bestAnswer: {
    id: string;
    text: string;
    rate: number;
    isSolution: boolean;
    createdAt: Date;
    updatedAt: Date;
    question: {
      id: string;
      title: string;
    };
  } | null;
  bestQuestion: {
    id: string;
    title: string;
    rate: number;
    isClosed: boolean;
    tags: string[];
    answersAmount: number;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}