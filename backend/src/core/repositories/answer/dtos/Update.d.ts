import { Answer } from '@core/models/answer';

export type AnswerRepoUpdateInput = {
  answerId: string,
  data: {
    text: string,
  }
}

export type AnswerRepoUpdateOutput = Answer;
