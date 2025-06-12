import { answerPath } from './path';

export const AnswerDeletePath = answerPath+'/:answerId';

export interface AnswerDeleteParams {
  answerId: string;
}
