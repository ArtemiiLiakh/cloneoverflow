import { questionPath } from './paths';

export const QuestionAddViewerPath = questionPath+'/:questionId/viewer';

export interface QuestionAddViewerParams {
  questionId: string
}