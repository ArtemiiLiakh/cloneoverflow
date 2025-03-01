import { Answer } from '@core/models/Answer';

export type AnswerCreateInput = {
  executorId: string, 
  questionId: string;
  text: string;
};

export type AnswerCreateOutput = Answer;
