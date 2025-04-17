import { Select } from '@common/repository/select';
import { isObjectEmpty } from '@common/utils/objectUtils';
import { User } from '@core/models/user';
import { Prisma } from '@prisma/client';

export const UserSelectAdapter = (
  select?: Select<User>,
): Prisma.UserSelect => {
  if (!select || isObjectEmpty(select)) return {
    id: true,
    name: true,
    username: true,
    rating: true,
    status: true,
    createdAt: true,
    updatedAt: true,
  };

  return {
    id: select.userId,
    name: select.name,
    username: select.username,
    rating: select.rating,
    status: select.status,
    createdAt: select.createdAt,
    updatedAt: select.updatedAt,
  };
}; 