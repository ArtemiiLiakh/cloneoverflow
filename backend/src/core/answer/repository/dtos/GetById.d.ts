import { Select } from '@common/repository/select';
import { Answer } from '@core/answer';

export type AnswerRepoGetByIdInput = {
  answerId: string,
  select?: Select<Answer>,
}

export type AnswerRepoGetByIdOutput = Answer;