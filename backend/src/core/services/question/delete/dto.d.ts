import { Question } from '@core/models/Question';

export type QuestionDeleteInput = {
  executorId: string,
  questionId: string, 
};

export type QuestionDeleteOutput = Question;
