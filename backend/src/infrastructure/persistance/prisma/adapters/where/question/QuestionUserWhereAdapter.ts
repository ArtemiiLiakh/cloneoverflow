import { QuestionUserWhere } from '@core/domain/repositories/question/dtos/Params';
import { Prisma } from '@prisma/client';
import { BasicStringWhereAdapter } from '../dataTypes/BasicWhereAdapter';
import { StringWhereAdapter } from '../dataTypes/StringWhereAdapter';

export const QuestionUserWhereAdapter = (where: QuestionUserWhere): Prisma.UserQuestionsWhereInput => {
  return {
    id: BasicStringWhereAdapter(where.id),
    questionId: BasicStringWhereAdapter(where.questionId),
    userId: BasicStringWhereAdapter(where.userId),
    status: StringWhereAdapter(where.status) as Prisma.EnumUserQuestionStatusFilter,
    voteType: where.voteType,
  };
};