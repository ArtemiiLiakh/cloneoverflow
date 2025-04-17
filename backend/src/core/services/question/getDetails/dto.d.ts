import { QuestionDetails } from '@core/models/question/QuestionDetails';

export type QuestionGetDetailsInput = {
  questionId: string,
  executorId?: string,
}

export type QuestionGetDetailsOutput = QuestionDetails;