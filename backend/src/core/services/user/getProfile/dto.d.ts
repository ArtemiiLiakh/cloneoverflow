import { Tag } from '@core/domain/entities/Tag';
import { User } from '@core/domain/entities/User';

export type UserGetProfileInput = {
  userId: string
};

export type UserGetProfileOutput = {
  user: User, 
  bestQuestion: {
    entity: {
      questionId: string,
      ownerId: string,
      title: string,
      rating: number,
      views: number,
      isClosed: boolean,
      createdAt: Date,
    },
    tags: Tag[],
    answersAmount: number,
  } | null,
  bestAnswer: {
    entity: {
      answerId: string,
      ownerId: string,
      questionId: string,
      rating: number,
      isSolution: boolean,
      createdAt: Date,
    },
    question: {
      questionId: string,
      ownerId: string,
      title: string,
      rating: number,
    }
  } | null,
  questionsAmount: number;
  answersAmount: number;
};