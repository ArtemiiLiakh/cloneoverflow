import { Where } from '@common/repository/where';
import { Prisma } from '@prisma/client';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';
import { QuestionUserStats } from '@core/domain/entities/QuestionUserStats';

export const QuestionUserStatsWhereAdapter = (where: Where<QuestionUserStats>): Prisma.UserQuestionsWhereInput => {
  return {
    id: StringWhereAdapter(where.id),
    questionId: StringWhereAdapter(where.questionId),
    userId: StringWhereAdapter(where.userId),
    status: StringWhereAdapter(where.status) as Prisma.EnumUserQuestionStatusFilter,
    voteType: StringWhereAdapter(where.voteType) as Prisma.EnumVoteTypeNullableFilter,
  };
};