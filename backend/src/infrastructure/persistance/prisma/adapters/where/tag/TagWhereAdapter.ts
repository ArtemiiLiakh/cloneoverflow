import { TagWhere } from '@core/domain/repositories/tag/dtos/Params';
import { parseNumberOrArray } from '@infrastructure/persistance/prisma/utils/number';
import { Prisma } from '@prisma/client';
import { BasicNumberWhereAdapter } from '../dataTypes/BasicWhereAdapter';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';

export const TagWhereAdapter = (where?: TagWhere): Prisma.TagWhereInput => {
  if (!where) return {};
  
  return {
    id: BasicNumberWhereAdapter(parseNumberOrArray(where.tagId)),
    name: StringWhereAdapter(where.name),
    questions: {
      some: {
        id: BasicNumberWhereAdapter(parseNumberOrArray(where.questions?.questionId)),
      },
    },
    OR: where.OR?.map((item) => TagWhereAdapter(item)),
    AND: where.AND?.map((item) => TagWhereAdapter(item)),
  };
};