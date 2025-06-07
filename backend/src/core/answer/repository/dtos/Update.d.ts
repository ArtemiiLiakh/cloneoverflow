import { Answer } from '@core/answer';

export type AnswerRepoUpdateInput = {
  answerId: string,
  data: {
    text: string,
  }
}

export type AnswerRepoUpdateOutput = Answer;
