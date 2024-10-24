import { Tag } from '@core/domain/entities/Tag';
import Prisma from '@prisma/client';

export class TagMapper {
  static toEntity(tag: Prisma.Tag): Tag {
    return Tag.new({
      id: tag.id,
      text: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    });
  }

  static toEntities(tags: Prisma.Tag[]): Tag[] {
    return tags.map(this.toEntity);
  }
}