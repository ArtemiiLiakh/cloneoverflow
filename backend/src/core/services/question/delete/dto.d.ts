import { Question } from '@core/models/question/Question';

export type QuestionDeleteInput = {
  executorId: string,
  questionId: string, 
};

export type QuestionDeleteOutput = Question;
