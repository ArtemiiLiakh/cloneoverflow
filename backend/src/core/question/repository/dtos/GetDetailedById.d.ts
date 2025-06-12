import { QuestionDetails } from '@core/question';

export type QuestionRepoGetDetailedByIdInput = {
  questionId: string,
  executorId?: string,
}

export type QuestionRepoGetDetailedByIdOutput = QuestionDetails;