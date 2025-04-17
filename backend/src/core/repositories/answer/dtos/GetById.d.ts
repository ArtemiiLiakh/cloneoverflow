import { Select } from '@common/repository/select';
import { Answer } from '@core/models/answer';

export type AnswerRepoGetByIdInput = {
  answerId: string,
  select?: Select<Answer>,
}

export type AnswerRepoGetByIdOutput = Answer;