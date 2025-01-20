import { OrderByEnum, SearchQuestionSortByEnum } from '@cloneoverflow/common';
import { QuestionOrderBy, QuestionOrderByType } from '@core/domain/repositories/question/dtos/Params';

export const SearchQuestionsSortBy = (
  sortBy?: SearchQuestionSortByEnum | SearchQuestionSortByEnum[], 
  orderBy?: OrderByEnum,
): QuestionOrderBy => {
  const searchMapper: Record<SearchQuestionSortByEnum, QuestionOrderByType> = {
    answers: {
      answersAmount: orderBy ?? OrderByEnum.DESC,
    },
    date: {
      createdAt: orderBy ?? OrderByEnum.DESC,
    },
  
    rate: {
      rating: orderBy ?? OrderByEnum.DESC,
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

  return sortBy ? searchMapper[sortBy] : {
    createdAt: orderBy ?? OrderByEnum.DESC,
  };
};