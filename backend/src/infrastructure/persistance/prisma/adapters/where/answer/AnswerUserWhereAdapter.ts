import { AnswerUserWhere } from '@core/domain/repositories/answer/dtos/Params';
import { Prisma } from '@prisma/client';
import { BasicStringWhereAdapter } from '../dataTypes/BasicWhereAdapter';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';

export const AnswerUserWhereAdapter = (where?: AnswerUserWhere): Prisma.AnswerUserWhereInput => {
  if (!where) return {};
  
  return {
    answerUserId: StringWhereAdapter(where.id),
    answerId: StringWhereAdapter(where.answerId),
    userId: StringWhereAdapter(where.userId),
    status: BasicStringWhereAdapter(where.status) as Prisma.EnumUserAnswerStatusFilter,
    voteType: where.voteType,
  };
};