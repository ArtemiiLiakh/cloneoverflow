import { QuestionVoter } from '@core/question/QuestionVoter';

export type QuestionGetVoterInput = {
  voterId: string;
  questionId: string;
}

export type QuestionGetVoterOutput = QuestionVoter;