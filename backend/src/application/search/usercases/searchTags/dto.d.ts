import { OrderByEnum, PaginationOptions, SearchTagsSortByEnum } from '@cloneoverflow/common';
import { PaginatedData } from '@common/repository/pagination';
import { Tag } from '@core/tag/Tag';

export type SearchTagsInput = {
  name?: string;
  sortBy?: SearchTagsSortByEnum;
  orderBy?: OrderByEnum;
  pagination?: PaginationOptions;
};

export type SerachTagsOutput = PaginatedData<{
  tag: Tag,
  questionAmount: number;
}>;