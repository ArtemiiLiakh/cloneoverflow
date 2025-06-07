import { PaginationOptions } from '@cloneoverflow/common';
import { PaginatedData } from '@common/repository/pagination';
import { Tag } from '@core/tag';
import { SearchTagsOrderByProps } from '../props/SearchTagsOrderByProps';

export type TagRepoSearchWhereProps = {
  searchText?: string,
} 

export type TagRepoSearchInput = {
  where: TagRepoSearchWhereProps,
  orderBy?: SearchTagsOrderByProps,
  pagination?: PaginationOptions,
}

export type TagRepoSearchOutputProps = {
  tag: Tag,
  questionAmount: number,
}

export type TagRepoSearchOutput = PaginatedData<TagRepoSearchOutputProps>;
