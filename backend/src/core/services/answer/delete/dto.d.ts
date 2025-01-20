import { Answer } from '@core/domain/entities/Answer';

export type AnswerDeleteInput = {
  executorId: string
  answerId: string, 
};

export type AnswerDeleteOutput = Answer;
