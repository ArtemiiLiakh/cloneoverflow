import { TagWhere } from '@core/domain/repositories/tag/dtos/Params';
import { Prisma } from '@prisma/client';
import { BasicStringWhereAdapter } from '../dataTypes/BasicWhereAdapter';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';

export const TagWhereAdapter = (where: TagWhere): Prisma.TagWhereInput => {
  return {
    id: BasicStringWhereAdapter(where.tagId),
    name: StringWhereAdapter(where.text),
    questions: {
      some: {
        id: BasicStringWhereAdapter(where.questions?.questionId),
      },
    },
    OR: where.OR?.map((item) => TagWhereAdapter(item)),
    AND: where.AND?.map((item) => TagWhereAdapter(item)),
  };
};