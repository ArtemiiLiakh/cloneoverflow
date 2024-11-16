import { TagRepositoryInput } from '@core/domain/repositories/tag/input/TagRepositoryInput';
import { Prisma } from '@prisma/client';
import { QuestionWhereInputAdapter } from '../question/QuestionWhereInputAdapter';
import { TagWhereInputAdapter } from './TagWhereInputAdapter';

export const TagWhereAdapter = (where: TagRepositoryInput.TagWhere): Prisma.TagWhereInput => {
  return {
    ...TagWhereInputAdapter(where),

    questions: where.questions ? {
      some: QuestionWhereInputAdapter(where.questions),
    } : undefined,
  };
};