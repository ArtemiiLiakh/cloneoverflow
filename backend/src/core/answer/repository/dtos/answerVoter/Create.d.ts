import { VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerVoter } from '@core/answer';

export type AnswerVoterRepoCreateInput = {
  userId: string,
  answerId: string,
  voteType: VoteTypeEnum;
}

export type AnswerVoterRepoCreateOutput = AnswerVoter;