import { TagRepository } from '@core/domain/repositories/tag/TagRepository';
import { TagsSortBy } from '@core/services/utils/tag/TagSortBy';
import { SearchServiceInput } from '../dtos/SearchServiceInput';
import { SearchServiceOutput } from '../dtos/SearchServiceOutput';
import { ISearchTagsUseCase } from '../types/usecases';

export class SearchTagsUseCase implements ISearchTagsUseCase {
  constructor (
    private tagRepository: TagRepository,
  ) {}

  async execute (
    { name, orderBy, sortBy, pagination }: SearchServiceInput.SearchTags,
  ): Promise<SearchServiceOutput.SerachTags> {
    const tags = await this.tagRepository.paginate({
      where: {
        text: {
          contains: name,
        },
      },
      pagination,
      options: {
        count: {
          questions: true,
        },
        orderBy: TagsSortBy(sortBy, orderBy),
      },
    });
  
    return {
      data: tags.data.map((tag) => ({
        entity: tag.entity,
        questionsAmount: tag.counts?.questions ?? 0,
      })),
      pagination: tags.pagination,
    };
  }
}