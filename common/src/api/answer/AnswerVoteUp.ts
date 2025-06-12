import { answerPath } from './path';

export const AnswerVoteUpPath = answerPath+'/:answerId/vote/up';

export interface AnswerVoteUpParams {
  answerId: string;
}