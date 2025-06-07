import { AnswersSortByEnum, OrderByEnum } from '@cloneoverflow/common';
import { AnswerOrderByProps } from '@core/answer/repository/props/AnswerOrderByProps';

export const AnswersSortByMapper = (
  sortBy: AnswersSortByEnum, 
  orderBy?: OrderByEnum,
): AnswerOrderByProps => {
  const sortByMapper: Record<AnswersSortByEnum, AnswerOrderByProps> = {
    rate: {
      rate: orderBy ?? OrderByEnum.DESC,
    },
    date: {
      date: orderBy ?? OrderByEnum.DESC,
    },
    solution: {
      solution: orderBy ?? OrderByEnum.DESC,
    },
  }; 

  return sortByMapper[sortBy];
};