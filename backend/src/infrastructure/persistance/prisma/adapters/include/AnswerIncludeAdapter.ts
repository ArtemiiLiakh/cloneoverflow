import { AnswerRepositoryInput } from "@core/domain/repositories/answer/input/AnswerRepositoryInput";
import { Prisma } from "@prisma/client";
import { IncludeParams } from "./utils/IncludeParams";
import { AnswerUserStatsWhereAdapter } from "../where/answer/AnswerUserStatsWhereAdapter";

export const AnswerIncludeAdapter = (
  include: AnswerRepositoryInput.AnswerInclude | undefined,
  count: AnswerRepositoryInput.AnswerCount | undefined,
): Prisma.AnswerInclude => {
  if (!include && !count) return {};

  return {
    owner: include?.owner ?? false,
    question: include?.question ?? false,
    userAnswers: IncludeParams<Prisma.UserAnswersWhereInput>(include?.users, AnswerUserStatsWhereAdapter),
    _count: count ? {
      select: {
        userAnswers: IncludeParams<Prisma.UserAnswersWhereInput>(count?.users, AnswerUserStatsWhereAdapter),
      }
    }: false,
  };
}