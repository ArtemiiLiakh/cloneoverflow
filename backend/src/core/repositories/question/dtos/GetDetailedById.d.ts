import { QuestionDetails } from '@core/models/question';

export type QuestionRepoGetDetailedByIdInput = {
  questionId: string,
  voterId?: string,
}

export type QuestionRepoGetDetailedByIdOutput = QuestionDetails;