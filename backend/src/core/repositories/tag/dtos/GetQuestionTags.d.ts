import { Tag } from '@core/models/tag';

export type TagRepoGetQuestionTagsInput = {
  questionId: string,
}

export type TagRepoGetQuestionTagsOutput = Tag[];