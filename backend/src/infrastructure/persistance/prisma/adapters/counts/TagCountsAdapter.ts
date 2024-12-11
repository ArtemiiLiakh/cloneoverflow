import { TagCountInput } from '@core/domain/repositories/tag/dtos/Params';
import { Prisma } from '@prisma/client';

export const TagCountsAdapter = (counts?: TagCountInput): Prisma.TagInclude => {
  if (!counts) return {};
  return {
    _count: {
      select: {
        questions: counts.questions,
      },
    },
  };
};