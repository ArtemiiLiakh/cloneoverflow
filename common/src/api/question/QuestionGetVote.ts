import { VoteTypeEnum } from '@enums/VoteType';
import { questionPath } from './paths';

export const QuestionGetVotePath = questionPath+'/:questionId/vote';

export interface QuestionGetVoteParams {
  questionId: string
}

export interface QuestionGetVoteResponse {
  voterId: string;
  voteType: VoteTypeEnum;
}