import { answerPath } from './path';

export interface AnswerCreateBody {
  questionId: string;
  text: string;
}

export interface AnswerCreateResponse {
  id: string;
}

export const AnswerCreatePath = answerPath;