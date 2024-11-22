import { UserRepositoryInput } from '@core/domain/repositories/user/input/UserRepositoryInput';
import { Prisma } from '@prisma/client';
import { UserIncludeAdapter } from '../include/UserIncludeAdapter';

export const UserSelectAdapter = (
  select?: UserRepositoryInput.UserSelect,
  include?: UserRepositoryInput.UserInclude,
  count?: UserRepositoryInput.UserCount,
): Prisma.UserSelect => {
  if (!select) return {
    userId: true,
    name: true,
    username: true,
    reputation: true,
    about: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    ...UserIncludeAdapter(include, count),
  };

  return {
    userId: select.id,
    name: select.name,
    username: select.username,
    reputation: select.reputation,
    about: select.about,
    status: select.status,
    createdAt: select.createdAt,
    updatedAt: select.updatedAt,
    ...UserIncludeAdapter(include, count),
  };
}; 