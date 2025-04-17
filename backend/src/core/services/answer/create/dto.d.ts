import { Answer } from '@core/models/answer/Answer';

export type AnswerCreateInput = {
  executorId: string, 
  questionId: string;
  text: string;
};

export type AnswerCreateOutput = Answer;
