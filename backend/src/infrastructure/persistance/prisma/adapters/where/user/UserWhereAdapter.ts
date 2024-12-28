import { UserWhere } from '@core/domain/repositories/user/dtos/Params';
import { Prisma, VoteType } from '@prisma/client';
import { DateWhereAdapter } from '../dataTypes/DateWhereAdapter';
import { NumberWhereAdapter } from '../dataTypes/NumberWhereAdapter ';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';
import { BasicStringWhereAdapter } from '../dataTypes/BasicWhereAdapter';

export const UserWhereAdapter = (where?: UserWhere): Prisma.UserWhereInput => {
  if (!where) return {};
  return {
    userId: BasicStringWhereAdapter(where.userId),
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
        userId: BasicStringWhereAdapter(where.userQuestions.userId),
        questionId: BasicStringWhereAdapter(where.userQuestions.questionId),
        status: BasicStringWhereAdapter(where.userQuestions.status) as Prisma.EnumUserQuestionStatusFilter,
        voteType: BasicStringWhereAdapter(where.userQuestions.voteType) as Prisma.EnumVoteTypeNullableFilter,
      },
    } : undefined,
    answerUsers: where.userAnswers ? {
      some: {
        userId: BasicStringWhereAdapter(where.userAnswers.userId),
        answerId: BasicStringWhereAdapter(where.userAnswers.answerId),
        status: BasicStringWhereAdapter(where.userAnswers.status) as Prisma.EnumUserAnswerStatusFilter,
        voteType: where.userAnswers.voteType as VoteType,
      },
    } : undefined,
    OR: where.OR?.map((item) => UserWhereAdapter(item)),
    AND: where.AND?.map((item) => UserWhereAdapter(item)),
  };
};