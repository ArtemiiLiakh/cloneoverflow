import { isObjectEmpty } from '@common/utils/objectUtils';
import { TagRepositoryInput } from '@core/domain/repositories/tag/input/TagRepositoryInput';
import { Prisma } from '@prisma/client';
import { TagIncludeAdatper } from '../include/TagIncludeAdapter';

export const TagSelectAdapter = (
  select?: TagRepositoryInput.TagSelect,
  include?: TagRepositoryInput.TagInclude,
  count?: TagRepositoryInput.TagCount,
): Prisma.TagSelect => {
  if (!select || isObjectEmpty(select)) {
    return {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      ...TagIncludeAdatper(include, count),
    };
  } 
  return {
    id: select.id,
    name: select.text,
    createdAt: select.createdAt,
    updatedAt: select.updatedAt,
    ...TagIncludeAdatper(include, count),
  };
};