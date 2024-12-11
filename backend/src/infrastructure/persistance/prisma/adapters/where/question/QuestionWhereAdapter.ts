import { QuestionWhere } from '@core/domain/repositories/question/dtos/Params';
import { Prisma } from '@prisma/client';
import { BasicStringWhereAdapter } from '../dataTypes/BasicWhereAdapter';
import { DateWhereAdapter } from '../dataTypes/DateWhereAdapter';
import { NumberWhereAdapter } from '../dataTypes/NumberWhereAdapter ';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';

export const QuestionWhereAdapter = (where: QuestionWhere): Prisma.QuestionWhereInput => {
  return {
    id: BasicStringWhereAdapter(where.id),
    ownerId: StringWhereAdapter(where.ownerId),
    title: StringWhereAdapter(where.title),
    text: StringWhereAdapter(where.text),
    isClosed: where.isClosed,
    views: NumberWhereAdapter(where.views),
    rate: NumberWhereAdapter(where.rating),
    createdAt: DateWhereAdapter(where.createdAt),
    owner: {
      userId: BasicStringWhereAdapter(where.owner?.id),
      username: StringWhereAdapter(where.owner?.username),
      name: StringWhereAdapter(where.owner?.name),
    },
    tags: !where.tags ? undefined : {
      some: {
        id: BasicStringWhereAdapter(where.tags.id),
        name: StringWhereAdapter(where.tags.name),
      },
    },
    OR: where.OR?.map((item) => QuestionWhereAdapter(item)),
    AND: where.AND?.map((item) => QuestionWhereAdapter(item)),
  };
};