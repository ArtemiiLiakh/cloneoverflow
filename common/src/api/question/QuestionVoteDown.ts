import { questionPath } from './paths';

export const QuestionVoteDownPath = questionPath+'/:questionId/vote/down';

export interface QuestionVoteDownParams {
  questionId: string
}