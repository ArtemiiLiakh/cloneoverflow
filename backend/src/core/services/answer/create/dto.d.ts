import { Answer } from '@core/domain/entities/Answer';

export type AnswerCreateInput = {
  executorId: string, 
  questionId: string;
  text: string;
};

export type AnswerCreateOutput = Answer;
