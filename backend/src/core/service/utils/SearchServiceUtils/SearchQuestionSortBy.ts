import { OrderBy, SearchQuestionSortByEnum } from "@cloneoverflow/common";
import { QuestionRepositoryInput } from "@core/domain/repositories/question/input/QuestionRepositoryInput";

export const SearchQuestionsSortBy = (sortBy?: SearchQuestionSortByEnum, orderBy?: OrderBy) => {
  const searchMapper: Record<SearchQuestionSortByEnum, QuestionRepositoryInput.QuestionOrderBy> = {
    answers: {
      answers: orderBy ?? OrderBy.DESC,
    },
    date: {
      createdAt: orderBy ?? OrderBy.ASC,
    },
  
    rate: {
      rate: orderBy ?? OrderBy.DESC,
    },
  
    status: {
      status: orderBy ?? OrderBy.DESC,
    },
  
    views: {
      views: orderBy ?? OrderBy.DESC,
    },
  }

  return sortBy ? searchMapper[sortBy] : {};
}