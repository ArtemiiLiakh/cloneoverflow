import { PaginatedData } from "@common/utils/PaginatedData";
import { Question } from "@core/domain/entities/Question";
import { Tag } from "@core/domain/entities/Tag";
import { User } from "@core/domain/entities/User";

export namespace SearchServiceOutput {
  export type SearchQuestions = PaginatedData<{
    question: Question,
    owner: User,
    tags: Tag[],
    answersAmount: number,
  }>;

  export type SerachTags = PaginatedData<{
    tag: Tag,
    questionsAmount: number;
  }>;
}