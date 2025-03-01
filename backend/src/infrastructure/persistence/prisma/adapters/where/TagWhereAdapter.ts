import { TagWhere } from '@core/repositories/tag/dtos/Params';
import { parseNumberOrArray } from '@infrastructure/persistence/prisma/utils/number';
import { Prisma } from '@prisma/client';
import { BasicNumberWhereAdapter } from './dataTypes/BasicWhereAdapter';
import { StringWhereAdapter } from './dataTypes/StringWhereAdapter';

export const TagWhereAdapter = (where?: TagWhere): Prisma.TagWhereInput => {
  if (!where) return {};
  
  return {
    id: BasicNumberWhereAdapter(parseNumberOrArray(where.tagId)),
    name: StringWhereAdapter(where.name),
    questions: where.questions ? {
      some: {
        id: BasicNumberWhereAdapter(parseNumberOrArray(where.questions.questionId)),
      },
    } : undefined,
    OR: where.OR?.map((item) => TagWhereAdapter(item)),
    AND: where.AND?.map((item) => TagWhereAdapter(item)),
  };
};