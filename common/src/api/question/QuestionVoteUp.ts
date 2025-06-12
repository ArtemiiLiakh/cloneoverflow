import { questionPath } from './paths';

export const QuestionVoteUpPath = questionPath+'/:questionId/vote/up';

export interface QuestionVoteUpParams {
  questionId: string
}