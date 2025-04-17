import { AnswerVoter } from '@core/models/answer/AnswerVoter';

export type AnswerGetVoterInput = {
  answerId: string;
  userId: string;
};

export type AnswerGetVoterOutput = AnswerVoter;