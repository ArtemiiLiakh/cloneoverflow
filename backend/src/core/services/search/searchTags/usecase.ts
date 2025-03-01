import { TagRepository } from '@core/repositories/tag/TagRepository';
import { TagsSortBy } from '@core/services/utils/SearchTagSortBy';
import { SearchTagsInput, SerachTagsOutput } from './dto';
import { searchTagsOutputMapper } from './mapper';
import { ISearchTagsUseCase } from './type';

export class SearchTagsUseCase implements ISearchTagsUseCase {
  constructor (
    private tagRepository: TagRepository,
  ) {}

  async execute (
    { name, orderBy, sortBy, pagination }: SearchTagsInput,
  ): Promise<SerachTagsOutput> {
    const tags = await this.tagRepository.getMany({
      where: {
        name: {
          contains: name,
        },
      },
      counts: {
        questions: true,
      },
      orderBy: TagsSortBy(sortBy, orderBy),
      pagination,
    });
  
    return searchTagsOutputMapper(tags);
  }
}