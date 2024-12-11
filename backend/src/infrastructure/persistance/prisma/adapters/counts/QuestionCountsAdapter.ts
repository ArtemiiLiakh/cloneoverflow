import { QuestionCountInput } from '@core/domain/repositories/question/dtos/Params';
import { Prisma } from '@prisma/client';

export const QuestionCountsAdapter = (counts?: QuestionCountInput): Prisma.QuestionInclude => {
  if (!counts) return {};
  return {
    _count: {
      select: {
        answers: counts.answers,
        tags: counts.tags,
      },
    },
  };
};