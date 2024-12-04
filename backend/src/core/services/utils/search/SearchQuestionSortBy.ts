import { SearchQuestionSortByEnum, OrderByEnum } from '@cloneoverflow/common';
import { QuestionRepositoryInput } from '@core/domain/repositories/question/input/QuestionRepositoryInput';

export const SearchQuestionsSortBy = (
  sortBy?: SearchQuestionSortByEnum | SearchQuestionSortByEnum[], 
  orderBy?: OrderByEnum,
) => {
  const searchMapper: Record<SearchQuestionSortByEnum, QuestionRepositoryInput.QuestionOrderBy> = {
    answers: {
      answers: orderBy ?? OrderByEnum.DESC,
    },
    date: {
      createdAt: orderBy ?? OrderByEnum.ASC,
    },
  
    rate: {
      rate: orderBy ?? OrderByEnum.DESC,
    },
  
    isClosed: {
      isClosed: orderBy ?? OrderByEnum.DESC,
    },
  
    views: {
      views: orderBy ?? OrderByEnum.DESC,
    },
  };

  if (Array.isArray(sortBy)) {
    return sortBy.map(sort => searchMapper[sort]);
  }

  return sortBy ? searchMapper[sortBy] : {};
};