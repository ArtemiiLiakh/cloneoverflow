import { answerPath } from './path';

export const AnswerUpdatePath = answerPath+'/:answerId';

export interface AnswerUpdateParams {
  answerId: string;
}

export interface AnswerUpdateBody {
  text: string;
}