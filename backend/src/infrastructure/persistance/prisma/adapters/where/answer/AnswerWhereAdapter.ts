import { AnswerRepositoryInput } from "@core/domain/repositories/answer/input/AnswerRepositoryInput";
import { Prisma } from "@prisma/client";
import { StringWhereAdapter } from "../dataTypes/StringWhereAdapter";
import { NumberWhereAdapter } from "../dataTypes/NumberWhereAdapter ";
import { DateWhereAdapter } from "../dataTypes/DateWhereAdapter";
import { UserWhereInputAdapter } from "../user/UserWhereInputAdapter";
import { QuestionWhereInputAdapter } from "../question/QuestionWhereInputAdapter";
import { AnswerUserStatsWhereAdapter } from "./AnswerUserStatsWhereAdapter";

export const AnswerWhereAdapter = (where: AnswerRepositoryInput.AnswerWhere): Prisma.AnswerWhereInput => {
  const { owner, question, users } = where;
  
  return {
    id: StringWhereAdapter(where.id),
    ownerId: StringWhereAdapter(where.ownerId),
    questionId: StringWhereAdapter(where.questionId),
    text: StringWhereAdapter(where.text),
    rate: NumberWhereAdapter(where.rate),
    isSolution: where.isSolution,
    createdAt: DateWhereAdapter(where.createdAt),
    updatedAt: DateWhereAdapter(where.updatedAt),
    OR: where.OR?.map((item) => AnswerWhereAdapter(item)),
    AND: where.AND?.map((item) => AnswerWhereAdapter(item)),

    owner: owner ? UserWhereInputAdapter(owner) : undefined, 
    question: question ? QuestionWhereInputAdapter(question) : undefined,
    userAnswers: {
      some: users ? AnswerUserStatsWhereAdapter(users) : undefined,
    },
  };
};