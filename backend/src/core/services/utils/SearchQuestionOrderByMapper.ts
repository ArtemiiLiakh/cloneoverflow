import { OrderByEnum, SearchQuestionSortByEnum } from '@cloneoverflow/common';
import { SearchQuestionOrderByProps } from '@core/repositories/question/dtos/props/SearchQuestionOrderByProps';

export const SearchQuestionOrderByMapper = (
  sortBy: SearchQuestionSortByEnum, 
  orderBy: OrderByEnum | undefined,
): SearchQuestionOrderByProps => {
  const orderByMapper: Record<SearchQuestionSortByEnum, SearchQuestionOrderByProps> = {
    answers: {
      answers: orderBy ?? OrderByEnum.DESC,
    },
    date: {
      date: orderBy ?? OrderByEnum.DESC,
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

  return orderByMapper[sortBy];
};