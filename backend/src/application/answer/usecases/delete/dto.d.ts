import { Answer } from '@core/answer/Answer';

export type AnswerDeleteInput = {
  executorId: string
  answerId: string, 
};

export type AnswerDeleteOutput = Answer;
