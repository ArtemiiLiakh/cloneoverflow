import { Select } from '@common/repository/select';
import { Question } from '@core/question';

export type QuestionRepoGetByIdInput = {
  questionId: string,
  select?: Select<Question>,
}

export type QuestionRepoGetByIdOutput = Question;
