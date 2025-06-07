import { QuestionDetails } from '@core/question';

export type QuestionRepoGetDetailedByIdInput = {
  questionId: string,
  voterId?: string,
}

export type QuestionRepoGetDetailedByIdOutput = QuestionDetails;