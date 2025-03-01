import { AnswerUserWhere } from '@core/repositories/answer/dtos/Params';
import { parseNumberOrArray } from '@infrastructure/persistence/prisma/utils/number';
import { Prisma } from '@prisma/client';
import { BasicNumberWhereAdapter, BasicStringWhereAdapter, BasicUUIDWhereAdapter } from './dataTypes/BasicWhereAdapter';

export const AnswerUserWhereAdapter = (where?: AnswerUserWhere): Prisma.AnswerUserWhereInput => {
  if (!where) return {};
  
  return {
    id: BasicNumberWhereAdapter(parseNumberOrArray(where.id)),
    answerId: BasicNumberWhereAdapter(parseNumberOrArray(where.answerId)),
    userId: BasicUUIDWhereAdapter(where.userId),
    status: BasicStringWhereAdapter(where.status) as Prisma.EnumUserAnswerStatusFilter,
    voteType: where.voteType,
  };
};