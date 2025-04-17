import { Select } from '@common/repository/select';
import { Nullable } from '@common/utils/classTypes';
import { Answer } from '@core/models/answer';

export type AnswerRepoGetBestOwnerAnswerInput = {
  ownerId: string,
  select?: Select<Answer>;
}

export type AnswerRepoGetBestOwnerAnswerOutput = Nullable<{
  entity: Answer,
  question: {
    questionId: string,
    ownerId: string,
    title: string,
    rating: number,
  }
}>;