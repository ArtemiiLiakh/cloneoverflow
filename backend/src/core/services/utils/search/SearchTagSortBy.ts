import { OrderByEnum, SearchTagsSortByEnum } from '@cloneoverflow/common';
import { TagOrderBy, TagOrderByType } from '@core/domain/repositories/tag/dtos/Params';

export const TagsSortBy = (
  sortBy?: SearchTagsSortByEnum | SearchTagsSortByEnum[], 
  orderBy?: OrderByEnum,
): TagOrderBy => {
  const sortByMapper: Record<SearchTagsSortByEnum, TagOrderByType> = {
    name: {
      text: orderBy ?? OrderByEnum.ASC,
    },

    newest: {
      createdAt: orderBy ?? OrderByEnum.DESC,
    },
    
    popular: {
      questionsAmount: orderBy ?? OrderByEnum.DESC,
    },
  };

  if (Array.isArray(sortBy)) {
    return sortBy.map((sort) => sortByMapper[sort]);
  }

  return {
    questionsAmount: orderBy ?? OrderByEnum.DESC,
  };
};