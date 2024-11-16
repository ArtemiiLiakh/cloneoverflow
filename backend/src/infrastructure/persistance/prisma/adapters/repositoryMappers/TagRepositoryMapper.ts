import { PaginatedData } from '@cloneoverflow/common';
import { TagsRepositoryOutput } from '@core/domain/repositories/tag/output/TagRepositoryOutput';
import { PrismaTagTypes } from '../../types/PrismaTagTypes';
import { QuestionMapper } from '../entityMappers/QuestionMapper';
import { TagMapper } from '../entityMappers/TagMapper';

export class TagRepositoryMapper {
  static createOrFindMany (tags: PrismaTagTypes[]): TagsRepositoryOutput.CreateOrFindMany {
    return tags.map(TagMapper.toEntity);
  }

  static findOne (tag: PrismaTagTypes): TagsRepositoryOutput.FindOne {
    return {
      entity: TagMapper.toEntity(tag),
      questions: tag.questions ? QuestionMapper.toEntities(tag.questions) : undefined,
      counts: tag._count ? {
        questions: tag._count.questions ?? undefined,
      } : undefined,
    };
  }

  static update (tag: PrismaTagTypes): TagsRepositoryOutput.Update {
    return TagMapper.toEntity(tag);
  }

  static findMany (tags: PrismaTagTypes[]): TagsRepositoryOutput.FindMany {
    return tags.map((tag) => this.findOne(tag)!);
  }

  static paginate ({ data, pagination }: PaginatedData<PrismaTagTypes>): TagsRepositoryOutput.Paginate {
    return {
      data: this.findMany(data),
      pagination,
    };
  }
}