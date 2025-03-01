import { QuestionUser } from '@core/models';

export type QuestionGetVoteInput = {
  voterId: string;
  questionId: string;
}

export type QuestionGetVoteOutput = QuestionUser | null;