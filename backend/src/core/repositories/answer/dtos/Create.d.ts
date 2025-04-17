import { Answer } from '@core/models/answer';

export type AnswerRepoCreateInput = {
  ownerId: string,
  questionId: string,
  text: string,
}

export type AnswerRepoCreateOutput = Answer;