import { PaginatedData } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { Tag } from '@core/domain/entities/Tag';
import { User } from '@core/domain/entities/User';

export namespace SearchServiceOutput {
  export type SearchQuestions = PaginatedData<{
    entity: Question,
    owner: User,
    tags: Tag[],
    answersAmount: number,
  }>;

  export type SerachTags = PaginatedData<{
    entity: Tag,
    questionsAmount: number;
  }>;
}