import { questionPath } from './paths';

export const QuestionOpenPath = questionPath+'/:questionId/open';

export interface QuestionOpenParams {
  questionId: string
}