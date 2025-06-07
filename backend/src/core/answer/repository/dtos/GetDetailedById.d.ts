import { AnswerDetails } from '@core/answer';

export type AnswerRepoGetDetailedByIdInput = {
  answerId: string,
  voterId?: string,
}

export type AnswerRepoGetDetailedByIdOutput = AnswerDetails;