import { AnswersSortByEnum, OrderBy } from "@cloneoverflow/common";
import { AnswerRepositoryInput } from "@core/domain/repositories/answer/input/AnswerRepositoryInput";

export const UserAnswersSortBy = (sortBy?: AnswersSortByEnum, orderBy?: OrderBy): AnswerRepositoryInput.AnswerOrderBy => {
  const sortByMapper: Record<AnswersSortByEnum, AnswerRepositoryInput.AnswerOrderBy> = {
    rate: {
      rate: orderBy ?? OrderBy.DESC,
    },
    date: {
      createdAt: orderBy ?? OrderBy.ASC,
    },
    solution: {
      isSolution: orderBy ?? OrderBy.DESC,
    },
  } 

  return sortBy ? sortByMapper[sortBy] : {};
}