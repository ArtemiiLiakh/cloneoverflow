import { Nullable } from '@common/utils/classTypes';
import { QuestionVoter } from '@core/models/question';

export type QuestionVoterRepoGetInput = {
  questionId: string;
  userId: string;
};

export type QuestionVoterRepoGetOutput = Nullable<QuestionVoter>;