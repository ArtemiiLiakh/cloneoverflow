import { AnswerWhereInput } from '@core/domain/repositories/answer/dtos/Params';
import { Prisma } from '@prisma/client';
import { BasicStringWhereAdapter } from '../dataTypes/BasicWhereAdapter';
import { DateWhereAdapter } from '../dataTypes/DateWhereAdapter';
import { NumberWhereAdapter } from '../dataTypes/NumberWhereAdapter ';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';

export const AnswerWhereAdapter = (where: AnswerWhereInput): Prisma.AnswerWhereInput => {
  return {
    id: BasicStringWhereAdapter(where.id),
    ownerId: BasicStringWhereAdapter(where.ownerId),
    questionId: BasicStringWhereAdapter(where.questionId),
    text: StringWhereAdapter(where.text),
    rate: NumberWhereAdapter(where.rating),
    isSolution: where.isSolution,
    createdAt: DateWhereAdapter(where.createdAt),
    OR: where.OR?.map((item) => AnswerWhereAdapter(item)),
    AND: where.AND?.map((item) => AnswerWhereAdapter(item)),
    userAnswers: where.userAnswer ? {
      some: {
        answerId: BasicStringWhereAdapter(where.userAnswer.userId),
        status: BasicStringWhereAdapter(where.userAnswer.status) as Prisma.EnumUserAnswerStatusFilter,
        voteType: where.userAnswer.voteType,
      },
    } : undefined,
  };
};