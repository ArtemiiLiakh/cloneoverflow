import { AnswerDetails } from '@core/answer';

export type AnswerGetInput = {
  executorId?: string,
  answerId: string, 
};

export type AnswerGetOutput = AnswerDetails;