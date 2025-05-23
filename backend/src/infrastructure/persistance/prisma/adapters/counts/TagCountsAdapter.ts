import { TagCountInput, TagWhere } from '@core/domain/repositories/tag/dtos/Params';
import { Prisma } from '@prisma/client';
import { TagWhereAdapter } from '../where/tag/TagWhereAdapter';

export const TagCountsAdapter = (counts?: TagCountInput, where?: TagWhere): Prisma.TagInclude => {
  if (!counts) return {};
  return {
    _count: {
      select: {
        questions: counts.questions ? {
          where: { 
            tags: { some: TagWhereAdapter(where) },  
          },
        } : undefined,
      },
    },
  };
};