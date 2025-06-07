import { AnswerVoter } from '@core/answer/AnswerVoter';

export type AnswerGetVoterInput = {
  answerId: string;
  userId: string;
};

export type AnswerGetVoterOutput = AnswerVoter;