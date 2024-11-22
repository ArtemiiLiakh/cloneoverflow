import { UserStatusEnum } from '@enums/statuses/UserStatus';

export interface UserGetResponse {
  id: string;
  name: string;
  username: string;
  reputation: number;
  about: string;
  status: UserStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  questions?: {
    id: string;
    title: string;
    rate: number;
    views: number;
    isClosed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  answers?: {
    id: string;
    questionId: string;
    rate: number;
    isSolution: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  questionsAmount?: number;
  answersAmount?: number;
}