import { TagRepository } from '@core/domain/repositories/tag/TagRepository';
import { TagsSortBy } from '@core/services/utils/search/SearchTagSortBy';
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
    const tags = await this.tagRepository.getMany({
      where: {
        text: {
          contains: name,
        },
      },
      counts: {
        questions: true,
      },
      orderBy: TagsSortBy(sortBy, orderBy),
      pagination,
    });
  
    return {
      data: tags.data.map((tag) => ({
        entity: {
          id: tag.entity.id!,
          name: tag.entity.name!,
        },
        questionsAmount: tag.counts?.questions ?? 0,
      })),
      pagination: tags.pagination,
    };
  }
}