import { Tag } from '@core/domain/entities/Tag';
import Prisma from '@prisma/client';

export class TagMapper {
  static toEntity (tag: Partial<Prisma.Tag>): Tag {
    return Tag.new({
      id: tag.id?.toString(),
      name: tag.name ?? '',
    });
  }
}