import { VoteTypeEnum } from '@enums/VoteType';
import { answerPath } from './path';

export const AnswerGetVotePath = answerPath+'/:answerId/vote';

export interface AnswerGetVoteParams {
  answerId: string;
}

export interface AnswerGetVoteResponse {
  userId: string;
  voteType: VoteTypeEnum;
}