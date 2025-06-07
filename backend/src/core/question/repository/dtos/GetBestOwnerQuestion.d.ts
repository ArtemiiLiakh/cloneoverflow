import { Select } from '@common/repository/select';
import { Nullable } from '@common/utils/classTypes';
import { Question } from '@core/question';
import { Tag } from '@core/tag';

export type QuestionRepoGetBestOwnerQuestionInput = {
  ownerId: string,
  select?: Select<Question>;
}

export type QuestionRepoGetBestOwnerQuestionOutput = Nullable<{
  entity: Question,
  tags: Tag[],
  answersAmount: number,
}>;