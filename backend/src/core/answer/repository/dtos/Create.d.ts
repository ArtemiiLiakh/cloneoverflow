import { Answer } from '@core/answer';

export type AnswerRepoCreateInput = {
  ownerId: string,
  questionId: string,
  text: string,
}

export type AnswerRepoCreateOutput = Answer;