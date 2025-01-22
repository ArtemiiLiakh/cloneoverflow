import { UserWhere } from '@core/domain/repositories/user/dtos/Params';
import { parseNumberOrArray } from '@infrastructure/persistance/prisma/utils/number';
import { Prisma, VoteType } from '@prisma/client';
import { BasicNumberWhereAdapter, BasicStringWhereAdapter, BasicUUIDWhereAdapter } from '../dataTypes/BasicWhereAdapter';
import { DateWhereAdapter } from '../dataTypes/DateWhereAdapter';
import { NumberWhereAdapter } from '../dataTypes/NumberWhereAdapter ';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';

export const UserWhereAdapter = (where?: UserWhere): Prisma.UserWhereInput => {
  if (!where) return {};
  return {
    id: BasicUUIDWhereAdapter(where.userId),
    name: StringWhereAdapter(where.name),
    username: StringWhereAdapter(where.username),
    reputation: NumberWhereAdapter(where.rating),
    about: StringWhereAdapter(where.about),
    status: BasicStringWhereAdapter(where.status) as Prisma.EnumUserStatusFilter,
    createdAt: DateWhereAdapter(where.createdAt),
    updatedAt: DateWhereAdapter(where.updatedAt),
    userCreds: {
      email: StringWhereAdapter(where.email),
    },
    questionUsers: where.userQuestions ? {
      some: {
        userId: BasicUUIDWhereAdapter(where.userQuestions.userId),
        questionId: BasicNumberWhereAdapter(parseNumberOrArray(where.userQuestions.questionId)),
        status: BasicStringWhereAdapter(where.userQuestions.status) as Prisma.EnumUserQuestionStatusFilter,
        voteType: BasicStringWhereAdapter(where.userQuestions.voteType) as Prisma.EnumVoteTypeNullableFilter,
      },
    } : undefined,
    answerUsers: where.userAnswers ? {
      some: {
        userId: BasicUUIDWhereAdapter(where.userAnswers.userId),
        answerId: BasicNumberWhereAdapter(parseNumberOrArray(where.userAnswers.answerId)),
        status: BasicStringWhereAdapter(where.userAnswers.status) as Prisma.EnumUserAnswerStatusFilter,
        voteType: where.userAnswers.voteType as VoteType,
      },
    } : undefined,
    OR: where.OR?.map((item) => UserWhereAdapter(item)),
    AND: where.AND?.map((item) => UserWhereAdapter(item)),
  };
};