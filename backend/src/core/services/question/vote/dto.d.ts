import { VoteTypeEnum } from '@cloneoverflow/common';

export type QuestionVoteInput = {
  executorId: string, 
  questionId: string, 
  vote: VoteTypeEnum,
};

export type QuestionVoteOutput = void;