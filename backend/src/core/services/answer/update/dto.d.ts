import { Answer } from '@core/domain/entities/Answer';

export type AnswerUpdateInput = {
  answerId: string, 
  text: string,
};

export type AnswerUpdateOutput = Answer;
