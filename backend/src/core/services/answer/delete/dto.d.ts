import { Answer } from '@core/models/answer/Answer';

export type AnswerDeleteInput = {
  executorId: string
  answerId: string, 
};

export type AnswerDeleteOutput = Answer;
