import { OrderByEnum, SearchTagsSortByEnum } from '@cloneoverflow/common';
import { SearchTagsOrderByProps } from '@core/tag/repository/props/SearchTagsOrderByProps';

export const SearchTagsSortByMapper = (
  sortBy?: SearchTagsSortByEnum, 
  orderBy?: OrderByEnum,
): SearchTagsOrderByProps => {
  const sortByMapper: Record<SearchTagsSortByEnum, SearchTagsOrderByProps> = {
    name: {
      name: orderBy ?? OrderByEnum.ASC,
    },

    popular: {
      popular: orderBy ?? OrderByEnum.DESC,
    },

    newest: {
      newest: orderBy ?? OrderByEnum.DESC,
    },
  };

  return sortByMapper[sortBy ?? SearchTagsSortByEnum.POPULAR];
};