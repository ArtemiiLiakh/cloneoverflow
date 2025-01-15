import { isObjectEmpty } from '@common/utils/objectUtils';
import { UserSelectInput } from '@core/domain/repositories/user/dtos/Params';
import { Prisma } from '@prisma/client';

export const UserSelectAdapter = (
  select?: UserSelectInput,
): Prisma.UserSelect => {
  if (!select || isObjectEmpty(select)) return {
    userId: true,
    name: true,
    username: true,
    reputation: true,
    about: true,
    status: true,
    createdAt: true,
    updatedAt: true,
  };

  return {
    userId: select.id,
    name: select.name,
    username: select.username,
    reputation: select.rating,
    about: select.about,
    status: select.status,
    createdAt: select.createdAt,
    updatedAt: select.updatedAt,
  };
}; 