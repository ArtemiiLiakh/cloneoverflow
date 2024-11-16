import { QuestionRepositoryInput } from '@core/domain/repositories/question/input/QuestionRepositoryInput';
import { Prisma } from '@prisma/client';
import { DateWhereAdapter } from '../dataTypes/DateWhereAdapter';
import { NumberWhereAdapter } from '../dataTypes/NumberWhereAdapter ';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';
import { QuestionWhereAdapter } from './QuestionWhereAdapter';

export const QuestionWhereInputAdapter = (where: QuestionRepositoryInput.QuestionWhere): Prisma.QuestionWhereInput => {
  return {
    id: StringWhereAdapter(where.id),
    ownerId: StringWhereAdapter(where.ownerId),
    title: StringWhereAdapter(where.title),
    text: StringWhereAdapter(where.text),
    isClosed: where.isClosed,
    views: NumberWhereAdapter(where.views),
    rate: NumberWhereAdapter(where.rate),
    createdAt: DateWhereAdapter(where.createdAt),
    updatedAt: DateWhereAdapter(where.updatedAt),
    OR: where.OR?.map((item) => QuestionWhereAdapter(item)),
    AND: where.AND?.map((item) => QuestionWhereAdapter(item)),
  };
};