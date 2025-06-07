import config from '@/config';
import { SearchTagsSortByMapper } from '@application/search/utils/SearchTagSortByMapper';
import { TagRepository } from '@core/tag/repository/TagRepository';
import { SearchTagsInput, SerachTagsOutput } from './dto';
import { ISearchTagsUseCase } from './type';

export class SearchTagsUseCase implements ISearchTagsUseCase {
  constructor (
    private tagRepository: TagRepository,
  ) {}

  async execute (
    { name, orderBy, sortBy, pagination }: SearchTagsInput,
  ): Promise<SerachTagsOutput> {
    return this.tagRepository.search({
      where: {
        searchText: name,
      },
      orderBy: SearchTagsSortByMapper(sortBy, orderBy),
      pagination: pagination ?? config.defaultPagination,
    });
  }
}