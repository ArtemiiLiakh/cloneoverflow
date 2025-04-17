import { Answer } from '@core/models/answer/Answer';

export type AnswerUpdateInput = {
  executorId: string,
  answerId: string, 
  text: string,
};

export type AnswerUpdateOutput = Answer;
