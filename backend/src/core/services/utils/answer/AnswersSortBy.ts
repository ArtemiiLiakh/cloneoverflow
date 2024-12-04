import { AnswersSortByEnum, OrderByEnum } from '@cloneoverflow/common';
import { AnswerRepositoryInput } from '@core/domain/repositories/answer/input/AnswerRepositoryInput';

export const UserAnswersSortBy = (
  sortBy?: AnswersSortByEnum, 
  orderBy?: OrderByEnum,
): AnswerRepositoryInput.AnswerOrderBy => {
  const sortByMapper: Record<AnswersSortByEnum, AnswerRepositoryInput.AnswerOrderBy> = {
    rate: {
      rate: orderBy ?? OrderByEnum.DESC,
    },
    date: {
      createdAt: orderBy ?? OrderByEnum.ASC,
    },
    solution: {
      isSolution: orderBy ?? OrderByEnum.DESC,
    },
  }; 

  return sortBy ? sortByMapper[sortBy] : {};
};