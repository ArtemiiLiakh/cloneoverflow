import { QuestionRepositoryInput } from "@core/domain/repositories/question/input/QuestionRepositoryInput";
import { Prisma } from "@prisma/client";
import { StringWhereAdapter } from "../dataTypes/StringWhereAdapter";
import { NumberWhereAdapter } from "../dataTypes/NumberWhereAdapter ";
import { DateWhereAdapter } from "../dataTypes/DateWhereAdapter";
import { AnswerWhereInputAdapter } from "../answer/AnswerWhereInputAdapter";
import { TagWhereInputAdapter } from "../tag/TagWhereInputAdapter";
import { UserWhereInputAdapter } from "../user/UserWhereInputAdapter";
import { QuestionUserStatsWhereAdapter } from "./QuestionUserStatsWhereAdapter";

export const QuestionWhereAdapter = (where: QuestionRepositoryInput.QuestionWhere): Prisma.QuestionWhereInput => {
  const { answers, tags, owner, users } = where;
  
  return {
    id: StringWhereAdapter(where.id),
    ownerId: StringWhereAdapter(where.ownerId),
    title: StringWhereAdapter(where.title),
    text: StringWhereAdapter(where.text),
    status: StringWhereAdapter(where.status) as Prisma.EnumQuestionStatusFilter,
    views: NumberWhereAdapter(where.views),
    rate: NumberWhereAdapter(where.rate),
    createdAt: DateWhereAdapter(where.createdAt),
    updatedAt: DateWhereAdapter(where.updatedAt),
    OR: where.OR?.map((item) => QuestionWhereAdapter(item)),
    AND: where.AND?.map((item) => QuestionWhereAdapter(item)),

    answers: answers ? {
      some: AnswerWhereInputAdapter(answers)
    } : undefined,

    tags: tags ? {
      some: TagWhereInputAdapter(tags),
    } : undefined,

    owner: owner ? UserWhereInputAdapter(owner) : undefined,

    userQuestions: users ? {
      some: QuestionUserStatsWhereAdapter(users)
    } : undefined,
  };
}