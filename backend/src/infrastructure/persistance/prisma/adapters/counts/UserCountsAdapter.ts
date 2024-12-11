import { UserCountsInput } from '@core/domain/repositories/user/dtos/Params';
import { Prisma } from '@prisma/client';

export const UserCountsAdapter = (counts?: UserCountsInput): Prisma.UserInclude => {
  if (!counts) return {};
  return {
    _count: {
      select: {
        questions: counts.questions,
        answers: counts.answers,
      },
    },
  };
};