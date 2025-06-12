import { questionPath } from './paths';

export const QuestionUpdatePath = questionPath+'/:questionId';

export interface QuestionUpdateParams {
  questionId: string
}

export interface QuestionUpdateBody {
  title?: string;
  text?: string;
  tags?: string[];
}