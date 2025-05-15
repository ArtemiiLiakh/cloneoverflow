import { UserIncludeInput } from '@core/domain/repositories/user/dtos/Params';
import { Prisma } from '@prisma/client';

export const UserIncludeAdapter = (
  include?: UserIncludeInput,
): Prisma.UserInclude => {
  if (!include) return {};

  return {
    questions: !include.questions ? undefined : {
      select: {
        id: true,
        ownerId: true,
        title: true,
        rate: true,
        views: true,
        isClosed: true,
        createdAt: true,
        updatedAt: true,
      },
    },

    answers: !include.answers ? undefined : {
      select: {
        id: true,
        ownerId: true,
        questionId: true,
        rate: true,
        isSolution: true,
        createdAt: true,
        updatedAt: true,
      },
    },
  };
};