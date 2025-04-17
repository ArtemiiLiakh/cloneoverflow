import { Question } from '@core/models/question/Question';

export type QuestionGetInput = {
  questionId: string, 
};

export type QuestionGetOutput = Question;