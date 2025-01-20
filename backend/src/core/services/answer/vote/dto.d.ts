import { VoteTypeEnum } from '@cloneoverflow/common';

export type AnswerVoteInput = {
  executorId: string, 
  answerId: string, 
  vote: VoteTypeEnum,
};

export type AnswerVoteOutput = void;
