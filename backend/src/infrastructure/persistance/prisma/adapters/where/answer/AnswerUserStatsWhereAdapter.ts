import { Where } from '@common/repository/where';
import { Prisma } from '@prisma/client';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';
import { AnswerUserStats } from '@core/domain/entities/AnswerUserStats';

export const AnswerUserStatsWhereAdapter = (where: Where<AnswerUserStats>): Prisma.UserAnswersWhereInput => {
  return {
    id: StringWhereAdapter(where.id),
    answerId: StringWhereAdapter(where.answerId),
    userId: StringWhereAdapter(where.userId),
    status: StringWhereAdapter(where.status) as Prisma.EnumUserAnswerStatusFilter,
    voteType: StringWhereAdapter(where.voteType) as Prisma.EnumVoteTypeNullableFilter,
  };
};