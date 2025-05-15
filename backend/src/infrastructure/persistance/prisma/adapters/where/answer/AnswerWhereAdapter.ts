import { AnswerWhere } from '@core/domain/repositories/answer/dtos/Params';
import { parseNumberOrArray } from '@infrastructure/persistance/prisma/utils/number';
import { Prisma } from '@prisma/client';
import { BasicNumberWhereAdapter, BasicUUIDWhereAdapter } from '../dataTypes/BasicWhereAdapter';
import { DateWhereAdapter } from '../dataTypes/DateWhereAdapter';
import { NumberWhereAdapter } from '../dataTypes/NumberWhereAdapter ';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';

export const AnswerWhereAdapter = (where?: AnswerWhere): Prisma.AnswerWhereInput => {
  if (!where) return {};
  
  return {
    id: BasicNumberWhereAdapter(parseNumberOrArray(where.answerId)),
    ownerId: BasicUUIDWhereAdapter(where.ownerId),
    questionId: BasicNumberWhereAdapter(parseNumberOrArray(where.questionId)),
    text: StringWhereAdapter(where.text),
    rate: NumberWhereAdapter(where.rating),
    isSolution: where.isSolution,
    createdAt: DateWhereAdapter(where.createdAt),
    OR: where.OR?.map((item) => AnswerWhereAdapter(item)),
    AND: where.AND?.map((item) => AnswerWhereAdapter(item)),
  };
};