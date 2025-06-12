import { questionPath } from './paths';

export const QuestionClosePath = questionPath+'/:questionId/close';

export interface QuestionCloseParams {
  questionId: string
}

export interface QuestionCloseBody {
  answerId: string;
}