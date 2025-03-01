import { Answer } from '@core/models/Answer';

export type AnswerDeleteInput = {
  executorId: string
  answerId: string, 
};

export type AnswerDeleteOutput = Answer;
