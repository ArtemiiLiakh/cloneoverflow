import { answerPath } from './path';

export const AnswerVoteDownPath = answerPath+'/:answerId/vote/down';

export interface AnswerVoteDownParams {
  answerId: string;
}