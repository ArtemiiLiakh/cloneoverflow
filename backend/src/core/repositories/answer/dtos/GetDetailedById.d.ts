import { AnswerDetails } from '@core/models/answer';

export type AnswerRepoGetDetailedByIdInput = {
  answerId: string,
  voterId?: string,
}

export type AnswerRepoGetDetailedByIdOutput = AnswerDetails;