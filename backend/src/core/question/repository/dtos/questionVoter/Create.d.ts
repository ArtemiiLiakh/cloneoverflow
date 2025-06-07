import { VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionVoter } from '@core/question';

export type QuestionVoterRepoCreateInput = {
  userId: string,
  questionId: string,
  voteType: VoteTypeEnum;
}

export type QuestionVoterRepoCreateOutput = QuestionVoter;