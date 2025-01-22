import { isObjectEmpty } from '@common/utils/objectUtils';
import { TagSelectInput } from '@core/domain/repositories/tag/dtos/Params';
import { Prisma } from '@prisma/client';

export const TagSelectAdapter = (
  select?: TagSelectInput,
): Prisma.TagSelect => {
  if (!select || isObjectEmpty(select)) {
    return {
      id: true,
      name: true,
    };
  } 
  return {
    id: select.id,
    name: select.name,
  };
};