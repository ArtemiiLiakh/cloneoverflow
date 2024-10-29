import { TagRepository } from "@core/domain/repositories/tag/TagRepository";
import { TagsSortBy } from "@core/service/utils/TagServiceUtils/TagSortBy";
import { SearchServiceInput } from "../dto/SearchServiceInput";
import { SearchServiceOutput } from "../dto/SearchServiceOutput";
import { ISearchTagsUseCase } from "../types/usecases";

export class SearchTagsUseCase implements ISearchTagsUseCase {
  constructor (
    private tagRepository: TagRepository,
  ) {}

  async execute({ name, orderBy, sortBy, pagination }: SearchServiceInput.SearchTags): Promise<SearchServiceOutput.SerachTags> {
    const tags = await this.tagRepository.paginate({
      where: {
        text: {
          contains: name,
        },
      },
      pagination,
      options: {
        orderBy: TagsSortBy(sortBy, orderBy),
      }
    });
  
    return {
      data: tags.data.map((tag) => ({
        tag: tag.entity,
        questionsAmount: tag.counts?.questions ?? 0,
      })),
      pagination: tags.pagination,
    };
  }
}