import { Question } from '@core/question/Question';

export type QuestionDeleteInput = {
  executorId: string,
  questionId: string, 
};

export type QuestionDeleteOutput = Question;
