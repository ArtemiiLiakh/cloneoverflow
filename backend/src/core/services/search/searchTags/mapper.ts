import { TagsRepositoryOutput } from '@core/domain/repositories/tag/dtos/TagRepositoryOutput';
import { SerachTagsOutput } from './dto';

export const searchTagsOutputMapper = (
  tags: TagsRepositoryOutput.GetMany,
): SerachTagsOutput => ({
  data: tags.data.map((tag) => ({
    entity: {
      id: tag.entity.id!,
      name: tag.entity.name!,
    },
    questionsAmount: tag.counts?.questions ?? 0,
  })),
  pagination: tags.pagination,
});