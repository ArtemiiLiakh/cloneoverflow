import { QuestionWhere } from '@core/domain/repositories/question/dtos/Params';
import { parseNumberOrArray } from '@infrastructure/persistance/prisma/utils/number';
import { Prisma } from '@prisma/client';
import { BasicNumberWhereAdapter, BasicUUIDWhereAdapter } from '../dataTypes/BasicWhereAdapter';
import { DateWhereAdapter } from '../dataTypes/DateWhereAdapter';
import { NumberWhereAdapter } from '../dataTypes/NumberWhereAdapter ';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';

export const QuestionWhereAdapter = (where?: QuestionWhere): Prisma.QuestionWhereInput => {
  if (!where) return {};

  return {
    id: BasicNumberWhereAdapter(parseNumberOrArray(where.questionId)),
    ownerId: BasicUUIDWhereAdapter(where.ownerId),
    title: StringWhereAdapter(where.title),
    text: StringWhereAdapter(where.text),
    isClosed: where.isClosed,
    views: NumberWhereAdapter(where.views),
    rate: NumberWhereAdapter(where.rating),
    createdAt: DateWhereAdapter(where.createdAt),
    owner: {
      id: BasicUUIDWhereAdapter(where.owner?.id),
      username: StringWhereAdapter(where.owner?.username),
      name: StringWhereAdapter(where.owner?.name),
    },
    tags: where.tags ? {
      some: {
        id: BasicNumberWhereAdapter(parseNumberOrArray(where.tags.id)),
        name: StringWhereAdapter(where.tags.name),
      },
    } : undefined,
    OR: where.OR?.map((item) => QuestionWhereAdapter(item)),
    AND: where.AND?.map((item) => QuestionWhereAdapter(item)),
  };
};