import { TagWhere } from '@core/domain/repositories/tag/dtos/Params';
import { Prisma } from '@prisma/client';
import { BasicStringWhereAdapter } from '../dataTypes/BasicWhereAdapter';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';

export const TagWhereAdapter = (where?: TagWhere): Prisma.TagWhereInput => {
  if (!where) return {};
  
  return {
    tagId: BasicStringWhereAdapter(where.tagId),
    name: StringWhereAdapter(where.text),
    questions: {
      some: {
        questionId: BasicStringWhereAdapter(where.questions?.questionId),
      },
    },
    OR: where.OR?.map((item) => TagWhereAdapter(item)),
    AND: where.AND?.map((item) => TagWhereAdapter(item)),
  };
};