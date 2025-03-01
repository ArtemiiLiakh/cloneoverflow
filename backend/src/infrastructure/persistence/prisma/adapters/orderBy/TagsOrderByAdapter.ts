import { TagOrderBy, TagOrderByType } from '@core/repositories/tag/dtos/Params';
import { Prisma } from '@prisma/client';
import { MapArrayOrValue } from './utils/MapArrayOrValue';

export const TagOrderByAdapter = (
  orderBy: TagOrderBy | undefined,
): Prisma.TagOrderByWithRelationInput | Prisma.TagOrderByWithRelationInput[] => {
  if (!orderBy) return {};

  return MapArrayOrValue<
    TagOrderByType,
    Prisma.TagOrderByWithRelationInput
  >(orderBy, (order) => ({
    name: order.text,
    questions: !order.questionsAmount ? undefined : {
      _count: order.questionsAmount,
    },
  }));
};