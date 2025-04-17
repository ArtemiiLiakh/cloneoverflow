import config from '@/config';
import { TagRepository } from '@core/repositories/tag/TagRepository';
import { SearchTagsSortByMapper } from '@core/services/utils/SearchTagSortByMapper';
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