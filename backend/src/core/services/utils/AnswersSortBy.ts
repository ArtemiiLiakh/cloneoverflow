import { AnswersSortByEnum, OrderByEnum } from '@cloneoverflow/common';
import { AnswerOrderBy, AnswerOrderByType } from '@core/repositories/answer/dtos/Params';

export const UserAnswersSortBy = (
  sortBy?: AnswersSortByEnum | AnswersSortByEnum[], 
  orderBy?: OrderByEnum,
): AnswerOrderBy => {
  const sortByMapper: Record<AnswersSortByEnum, AnswerOrderByType> = {
    rate: {
      rating: orderBy ?? OrderByEnum.DESC,
    },
    date: {
      createdAt: orderBy ?? OrderByEnum.DESC,
    },
    solution: {
      isSolution: orderBy ?? OrderByEnum.DESC,
    },
  }; 

  if (Array.isArray(sortBy)) {
    return sortBy.map((sort) => sortByMapper[sort]);
  }

  return sortBy ? sortByMapper[sortBy] : {
    rating: orderBy ?? OrderByEnum.DESC,
  };
};