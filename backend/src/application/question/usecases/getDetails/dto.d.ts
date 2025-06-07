import { QuestionDetails } from '@core/question/QuestionDetails';

export type QuestionGetDetailsInput = {
  questionId: string,
  executorId?: string,
}

export type QuestionGetDetailsOutput = QuestionDetails;