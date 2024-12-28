import { isObjectEmpty } from '@common/utils/objectUtils';
import { TagSelectInput } from '@core/domain/repositories/tag/dtos/Params';
import { Prisma } from '@prisma/client';

export const TagSelectAdapter = (
  select?: TagSelectInput,
): Prisma.TagSelect => {
  if (!select || isObjectEmpty(select)) {
    return {
      tagId: true,
      name: true,
    };
  } 
  return {
    tagId: select.id,
    name: select.name,
  };
};