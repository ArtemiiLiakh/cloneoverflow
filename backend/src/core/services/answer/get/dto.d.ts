import { AnswerDetails } from '@core/models/answer';

export type AnswerGetInput = {
  executorId?: string,
  answerId: string, 
};

export type AnswerGetOutput = AnswerDetails;