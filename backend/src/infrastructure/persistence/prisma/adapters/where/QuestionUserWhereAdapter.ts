import { QuestionUserWhere } from '@core/repositories/question/dtos/Params';
import { parseNumberOrArray } from '@infrastructure/persistence/prisma/utils/number';
import { Prisma } from '@prisma/client';
import { BasicNumberWhereAdapter, BasicUUIDWhereAdapter } from './dataTypes/BasicWhereAdapter';
import { StringWhereAdapter } from './dataTypes/StringWhereAdapter';

export const QuestionUserWhereAdapter = (where?: QuestionUserWhere): Prisma.QuestionUserWhereInput => {
  if (!where) return {};
  
  return {
    id: BasicNumberWhereAdapter(parseNumberOrArray(where.id)),
    questionId: BasicNumberWhereAdapter(parseNumberOrArray(where.questionId)),
    userId: BasicUUIDWhereAdapter(where.userId),
    status: StringWhereAdapter(where.status) as Prisma.EnumUserQuestionStatusFilter,
    voteType: where.voteType,
  };
};