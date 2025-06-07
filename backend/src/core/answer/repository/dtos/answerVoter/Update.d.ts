import { VoteTypeEnum } from '@cloneoverflow/common';

export type AnswerVoterRepoUpdateInput = {
  voterId: string,
  voteType: VoteTypeEnum,
};

export type AnswerVoterRepoUpdateOutput = void;