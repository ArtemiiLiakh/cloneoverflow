import { AnswerUser } from '@core/models';

export type AnswerGetVoteInput = {
  answerId: string;
  userId: string;
};

export type AnswerGetVoteOutput = AnswerUser | null;