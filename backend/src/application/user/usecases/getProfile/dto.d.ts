import { UserStatusEnum } from '@cloneoverflow/common';
import { Nullable } from '@common/utils/classTypes';
import { Answer } from '@core/answer';
import { Question } from '@core/question';
import { Tag } from '@core/tag/Tag';

export type UserGetProfileInput = {
  userId: string
};

export type UserGetProfileOutput = {
  user: {
    userId: string,
    email: string,
    name: string,
    username: string,
    rating: number,
    status: UserStatusEnum,
    about: string,
    createdAt: Date,
    updatedAt: Date,
  }, 
  questionAmount: number,
  answerAmount: number,
  
  bestQuestion: Nullable<{
    entity: Question,
    tags: Tag[],
    answersAmount: number,
  }>,
  
  bestAnswer: Nullable<{
    entity: Answer,
    question: {
      questionId: string,
      ownerId: string,
      title: string,
      rating: number,
    },
  }>,
};