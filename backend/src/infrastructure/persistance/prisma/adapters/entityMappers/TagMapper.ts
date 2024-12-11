import { Tag } from '@core/domain/entities/Tag';
import Prisma from '@prisma/client';

export class TagMapper {
  static toEntity (tag: Prisma.Tag): Tag {
    return {
      id: tag.id,
      name: tag.name,
    };
  }
}