import { Answer } from '@core/domain/entities/Answer';
import { AnswerUser } from '@core/domain/entities/AnswerUser';

export type AnswerGetInput = {
  executorId?: string,
  answerId: string, 
};

export type AnswerGetOutput = {
  entity: Answer,
  owner?: {
    id: string,
    username: string,
    name: string,
    rating: number,
  } | null,
  question: {
    id: string,
    ownerId: string,
    title: string,
    rating: number,
    isClosed: boolean,
  },
  voter?: AnswerUser,
};