import { PaginatedData } from '@cloneoverflow/common';
import { Tag } from '@core/domain/entities/Tag';

export namespace SearchServiceOutput {
  export type SearchQuestions = PaginatedData<{
    entity: {
      questionId: string,
      ownerId: string,
      title: string,
      rating: number,
      views: number,
      isClosed: boolean,
      createdAt: Date,
    },
    owner: {
      userId: string,
      name: string,
      username: string,
      rating: number,
    },
    tags: Tag[],
    answersAmount: number,
  }>;

  export type SerachTags = PaginatedData<{
    entity: Tag,
    questionsAmount: number;
  }>;
}