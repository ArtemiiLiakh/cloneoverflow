import { Nullable } from '@common/utils/classTypes';
import { AnswerVoter } from '@core/answer';

export type AnswerVoterRepoGetInput = {
  answerId: string;
  userId: string;
};

export type AnswerVoterRepoGetOutput = Nullable<AnswerVoter>;