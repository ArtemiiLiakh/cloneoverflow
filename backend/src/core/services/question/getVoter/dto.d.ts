import { QuestionVoter } from '@core/models/question/QuestionVoter';

export type QuestionGetVoterInput = {
  voterId: string;
  questionId: string;
}

export type QuestionGetVoterOutput = QuestionVoter;