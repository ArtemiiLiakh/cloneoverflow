import { AnswerIncludeInput } from '@core/domain/repositories/answer/dtos/Params';
import { Prisma } from '@prisma/client';

export const AnswerIncludeAdapter = (
  include?: AnswerIncludeInput,
): Prisma.AnswerInclude => {
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

    question: !include.question ? undefined : {
      select: {
        id: true,
        ownerId: true,
        title: true,
        rate: true,
        isClosed: true,
      },
    },
  };
};