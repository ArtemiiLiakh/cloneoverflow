import { OrderByEnum, QuestionsSortByEnum } from '@cloneoverflow/common';
import { QuestionOrderByProps } from '@core/question/repository/props/QuestionOrderByProps';

export const QuestionsSortByMapper = (
  sortBy: QuestionsSortByEnum, 
  orderBy?: OrderByEnum,
): QuestionOrderByProps => {
  const sortByMapper: Record<QuestionsSortByEnum, QuestionOrderByProps> = {
    answers: {
      answers: orderBy ?? OrderByEnum.DESC,
    },

    date: {
      date: orderBy ?? OrderByEnum.DESC,
    },

    rate: {
      rate: orderBy ?? OrderByEnum.DESC,
    },
  };

  return sortByMapper[sortBy];
};