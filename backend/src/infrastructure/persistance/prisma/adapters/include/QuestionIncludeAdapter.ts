import { QuestionRepositoryInput } from "@core/domain/repositories/question/input/QuestionRepositoryInput";
import { Prisma } from "@prisma/client";
import { AnswerWhereAdapter } from "../where/answer/AnswerWhereAdapter";
import { QuestionUserStatsWhereAdapter } from "../where/question/QuestionUserStatsWhereAdapter";
import { TagWhereAdapter } from "../where/tag/TagWhereAdapter";
import { IncludeParams } from "./utils/IncludeParams";

export const QuestionIncludeAdapter = (
  include: QuestionRepositoryInput.QuestionInclude | undefined, 
  count: QuestionRepositoryInput.QuestionCount | undefined,
): Prisma.QuestionInclude => {
  if (!include && !count) return {};

  return {
    owner: include?.owner ?? false,
    answers: IncludeParams<Prisma.AnswerWhereInput>(include?.answers, AnswerWhereAdapter),
    tags: IncludeParams<Prisma.TagWhereInput>(include?.tags, TagWhereAdapter),
    userQuestions: IncludeParams<Prisma.UserQuestionsWhereInput>(include?.users, QuestionUserStatsWhereAdapter),
    _count: count ? {
      select: {
        answers: IncludeParams<Prisma.AnswerWhereInput>(count?.answers, AnswerWhereAdapter),
        tags: IncludeParams<Prisma.TagWhereInput>(count?.tags, TagWhereAdapter),
        userQuestions: IncludeParams<Prisma.UserQuestionsWhereInput>(count?.users, QuestionUserStatsWhereAdapter),
      },
    } : false,
  };
}