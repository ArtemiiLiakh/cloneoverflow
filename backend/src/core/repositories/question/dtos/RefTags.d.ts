import { Tag } from '@core/models/tag';

export type QuestionRepoRefTagsInput = {
  questionId: string,
  tags: Tag[],
}

export type QuestionRepoRefTagsOutput = void;
