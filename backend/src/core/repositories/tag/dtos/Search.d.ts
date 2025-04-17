import { PaginatedData, PaginationDTO } from '@cloneoverflow/common';
import { Tag } from '@core/models/tag';
import { SearchTagsOrderByProps } from '../props/SearchTagsOrderByProps';

export type TagRepoSearchWhereProps = {
  searchText?: string,
} 

export type TagRepoSearchInput = {
  where: TagRepoSearchWhereProps,
  orderBy?: SearchTagsOrderByProps,
  pagination?: PaginationDTO,
}

export type TagRepoSearchOutputProps = {
  tag: Tag,
  questionAmount: number,
}

export type TagRepoSearchOutput = PaginatedData<TagRepoSearchOutputProps>;
