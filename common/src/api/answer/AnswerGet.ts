import { VoteTypeEnum } from '@enums/VoteType';
import { answerPath } from './path';

export const AnswerGetPath = answerPath+'/:answerId';

export interface AnswerGetParams {
  answerId: string;
}

export interface AnswerGetResponse {
  id: string;
  questionId: string;
  text: string;
  rating: number;
  isSolution: boolean;
  owner: {
    id: string;
    name: string;
    username: string;
    rating: number;
  } | null;
  myVoteType: VoteTypeEnum | null;
  createdAt: string;
  updatedAt: string;
}