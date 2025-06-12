import { questionPath } from './paths';

export const QuestionDeletePath = questionPath+'/:questionId';

export interface QuestionDeleteParams {
  questionId: string
}