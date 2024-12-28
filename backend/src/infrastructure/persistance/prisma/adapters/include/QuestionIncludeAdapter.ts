import { QuestionIncludeInput } from '@core/domain/repositories/question/dtos/Params';
import { Prisma } from '@prisma/client';

export const QuestionIncludeAdapter = (
  include?: QuestionIncludeInput,
): Prisma.QuestionInclude => {
  if (!include) return {};
  return {
    owner: !include.owner ? undefined : {
      select: {
        userId: true,
        name: true,
        username: true,
        reputation: true,
        status: true,
      },
    },

    answers: !include.answers ? undefined : {
      select: {
        answerId: true,
        ownerId: true,
        questionId: true,
        rate: true,
        isSolution: true,
        createdAt: true,
      },
    },

    tags: !include.tags ? undefined : {
      select: {
        tagId: true,
        name: true,
      },
    },
  };
};