import { VoteTypeEnum } from '@cloneoverflow/common';

export type QuestionVoterRepoUpdateInput = {
  voterId: string;
  voteType: VoteTypeEnum;
};

export type QuestionVoterRepoUpdateOutput = void;