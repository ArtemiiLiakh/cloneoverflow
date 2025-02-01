import { Answer } from '@core/domain/entities/Answer';

export type AnswerUpdateInput = {
  executorId: string,
  answerId: string, 
  text: string,
};

export type AnswerUpdateOutput = Answer;
