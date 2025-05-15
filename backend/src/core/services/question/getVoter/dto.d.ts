import { QuestionUser } from '@core/domain/entities';

export type QuestionGetVoterInput = {
  voterId: string;
  questionId: string;
}

export type QuestionGetVoterOutput = QuestionUser | null;