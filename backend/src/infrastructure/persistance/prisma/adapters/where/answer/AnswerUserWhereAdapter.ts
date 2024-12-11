import { Prisma } from '@prisma/client';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';
import { AnswerUserWhere } from '@core/domain/repositories/answer/dtos/Params';

export const AnswerUserWhereAdapter = (where: AnswerUserWhere): Prisma.UserAnswersWhereInput => {
  return {
    id: StringWhereAdapter(where.id),
    answerId: StringWhereAdapter(where.answerId),
    userId: StringWhereAdapter(where.userId),
    status: StringWhereAdapter(where.status) as Prisma.EnumUserAnswerStatusFilter,
    voteType: StringWhereAdapter(where.voteType) as Prisma.EnumVoteTypeNullableFilter,
  };
};