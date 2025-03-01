import { SearchTagsSortByEnum, OrderByEnum, PaginationDTO, PaginatedData } from '@cloneoverflow/common';
import { Tag } from '@core/models/Tag';

export type SearchTagsInput = {
  name?: string;
  sortBy?: SearchTagsSortByEnum;
  orderBy?: OrderByEnum;
  pagination?: PaginationDTO;
};

export type SerachTagsOutput = PaginatedData<{
  entity: Tag,
  questionsAmount: number;
}>;