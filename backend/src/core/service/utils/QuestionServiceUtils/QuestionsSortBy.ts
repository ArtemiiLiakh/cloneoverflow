import { QuestionsSortByEnum, OrderByEnum } from "@cloneoverflow/common";
import { QuestionRepositoryInput } from "@core/domain/repositories/question/input/QuestionRepositoryInput";

export const QuestionsSortBy = (sortBy?: QuestionsSortByEnum, orderBy?: OrderByEnum): QuestionRepositoryInput.QuestionOrderBy => {
  const sortByMapper: Record<QuestionsSortByEnum, QuestionRepositoryInput.QuestionOrderBy> = {
    answers: {
      answers: orderBy ?? OrderByEnum.DESC,
    },

    date: {
      createdAt: orderBy ?? OrderByEnum.ASC,
    },

    rate: {
      rate: orderBy ?? OrderByEnum.DESC,
    },
  };

  return sortBy ? sortByMapper[sortBy] : {};
}