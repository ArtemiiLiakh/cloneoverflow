import { Select } from '@common/repository/select';
import { Question } from '@core/models/question';

export type QuestionRepoGetByIdInput = {
  questionId: string,
  select?: Select<Question>,
}

export type QuestionRepoGetByIdOutput = Question;
