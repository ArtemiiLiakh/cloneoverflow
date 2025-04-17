import { UserStatusEnum } from '@enums/statuses/UserStatus';

export interface UserGetProfileResponse {
  id: string;
  name: string;
  username: string;
  about: string;
  rating: number;
  status: UserStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  answerAmount: number;
  questionAmount: number;
  bestAnswer: {
    id: string;
    rating: number;
    isSolution: boolean;
    createdAt: Date;
    question: {
      id: string;
      ownerId: string;
      title: string;
      rating: number;
    };
  } | null;
  bestQuestion: {
    id: string;
    title: string;
    rating: number;
    isClosed: boolean;
    tags: string[];
    answersAmount: number;
    createdAt: Date;
  } | null;
}