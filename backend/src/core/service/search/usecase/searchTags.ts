import { SearchTagsDTO } from "@cloneoverflow/common";
import { TagRepository } from "@core/domain/repositories/tag/TagRepository";
import { getTagsSortBy } from "@core/service/utils/TagServiceUtils/GetTagSortBy";
import { SearchServiceOutput } from "../dto/SearchServiceOutput";
import { ISearchTagsUseCase } from "../types/usecases";

export class SearchTagsUseCase implements ISearchTagsUseCase {
  constructor (
    private tagRepository: TagRepository,
  ) {}

  async execute({ name, orderBy, sortBy, pagination }: SearchTagsDTO): Promise<SearchServiceOutput.SerachTags> {
    const tags = await this.tagRepository.paginate({
      where: {
        text: {
          contains: name,
        },
      },
      pagination,
      options: {
        orderBy: getTagsSortBy(sortBy, orderBy),
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