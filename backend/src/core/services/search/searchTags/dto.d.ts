import { SearchTagsSortByEnum, OrderByEnum, PaginationDTO, PaginatedData } from '@cloneoverflow/common';
import { Tag } from '@core/models/tag/Tag';

export type SearchTagsInput = {
  name?: string;
  sortBy?: SearchTagsSortByEnum;
  orderBy?: OrderByEnum;
  pagination?: PaginationDTO;
};

export type SerachTagsOutput = PaginatedData<{
  tag: Tag,
  questionAmount: number;
}>;