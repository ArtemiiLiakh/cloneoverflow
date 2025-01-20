import { Question } from '@core/domain/entities/Question';

export type QuestionDeleteInput = {
  executorId: string,
  questionId: string, 
};

export type QuestionDeleteOutput = Question;
