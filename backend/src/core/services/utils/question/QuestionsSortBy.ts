import { OrderByEnum, QuestionsSortByEnum } from '@cloneoverflow/common';
import { QuestionOrderBy, QuestionOrderByType } from '@core/domain/repositories/question/dtos/Params';

export const QuestionsSortBy = (
  sortBy?: QuestionsSortByEnum | QuestionsSortByEnum[], 
  orderBy?: OrderByEnum,
): QuestionOrderBy => {
  const sortByMapper: Record<QuestionsSortByEnum, QuestionOrderByType> = {
    answers: {
      answersAmount: orderBy ?? OrderByEnum.DESC,
    },

    date: {
      createdAt: orderBy ?? OrderByEnum.DESC,
    },

    rate: {
      rating: orderBy ?? OrderByEnum.DESC,
    },
  };

  if (Array.isArray(sortBy)) {
    return sortBy.map((sort) => sortByMapper[sort]);
  };

  return sortBy ? sortByMapper[sortBy] : {
    rating: orderBy ?? OrderByEnum.DESC,
  };
};