import { TagRepositoryInput } from '@core/domain/repositories/tag/input/TagRepositoryInput';
import { Prisma } from '@prisma/client';
import { QuestionWhereAdapter } from '../where/question/QuestionWhereAdapter';
import { IncludeParams } from './utils/IncludeParams';

export const TagIncludeAdatper = (
  include: TagRepositoryInput.TagInclude | undefined,
  count: TagRepositoryInput.TagCount | undefined,
): Prisma.TagInclude => {
  if (!include && !count) return {};

  return {
    questions: IncludeParams<Prisma.QuestionWhereInput>(include?.questions, QuestionWhereAdapter),
    _count: count ? {
      select: {
        questions: IncludeParams<Prisma.QuestionWhereInput>(count?.questions, QuestionWhereAdapter),
      },
    } : false,
  };
};