import { OrderBy, QuestionsSortByEnum } from "@cloneoverflow/common";
import { QuestionRepositoryInput } from "@core/domain/repositories/question/input/QuestionRepositoryInput";

export const QuestionsSortBy = (sortBy?: QuestionsSortByEnum, orderBy?: OrderBy): QuestionRepositoryInput.QuestionOrderBy => {
  const sortByMapper: Record<QuestionsSortByEnum, QuestionRepositoryInput.QuestionOrderBy> = {
    answers: {
      answers: orderBy ?? OrderBy.DESC,
    },

    date: {
      createdAt: orderBy ?? OrderBy.ASC,
    },

    rate: {
      rate: orderBy ?? OrderBy.DESC,
    },
  };

  return sortBy ? sortByMapper[sortBy] : {};
}