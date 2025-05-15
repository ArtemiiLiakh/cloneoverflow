import { UserCountsInput, UserWhere } from '@core/domain/repositories/user/dtos/Params';
import { Prisma } from '@prisma/client';
import { UserWhereAdapter } from '../where/user/UserWhereAdapter';

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