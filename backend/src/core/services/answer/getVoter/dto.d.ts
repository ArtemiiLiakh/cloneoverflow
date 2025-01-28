import { AnswerUser } from '@core/domain/entities';

export type AnswerGetVoterInput = {
  answerId: string;
  userId: string;
};

export type AnswerGetVoterOutput = AnswerUser | null;