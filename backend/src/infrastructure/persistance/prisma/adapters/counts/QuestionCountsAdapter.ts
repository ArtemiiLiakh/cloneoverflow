import { QuestionCountInput, QuestionWhere } from '@core/domain/repositories/question/dtos/Params';
import { Prisma } from '@prisma/client';
import { QuestionWhereAdapter } from '../where/question/QuestionWhereAdapter';

export const QuestionCountsAdapter = (counts?: QuestionCountInput, where?: QuestionWhere): Prisma.QuestionInclude => {
  if (!counts) return {};
  return {
    _count: {
      select: {
        answers: counts.answers ? {
          where: { question: QuestionWhereAdapter(where) },
        } : undefined,

        tags: counts.tags ? {
          where: { 
            questions: { some: QuestionWhereAdapter(where) },
          },
        } : undefined,
      },
    },
  };
};