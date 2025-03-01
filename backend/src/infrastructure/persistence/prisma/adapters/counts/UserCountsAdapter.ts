import { UserCountsInput, UserWhere } from '@core/repositories/user/dtos/Params';
import { Prisma } from '@prisma/client';
import { UserWhereAdapter } from '../where/UserWhereAdapter';

export const UserCountsAdapter = (counts?: UserCountsInput, where?: UserWhere): Prisma.UserInclude => {
  if (!counts) return {};
  return {
    _count: {
      select: {
        questions: counts.questions ? {
          where: { owner: UserWhereAdapter(where) },
        } : undefined,

        answers: counts.answers ? {
          where: { owner: UserWhereAdapter(where) },
        } : undefined,
      },
    },
  };
};