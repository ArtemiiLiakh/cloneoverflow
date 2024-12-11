import { AnswerOrderBy, AnswerOrderByType } from '@core/domain/repositories/answer/dtos/Params';
import { Prisma } from '@prisma/client';
import { MapArrayOrValue } from './utils/MapArrayOrValue';

export const AnswerOrderByAdapter = (
  orderBy: AnswerOrderBy | undefined,
): Prisma.AnswerOrderByWithRelationInput | Prisma.AnswerOrderByWithRelationInput[] => {
  if (!orderBy) return {};

  return MapArrayOrValue<
    AnswerOrderByType,
    Prisma.AnswerOrderByWithRelationInput
  >(orderBy, (order) => ({
    text: order.text,
    rate: order.rating,
    isSolution: order.isSolution,
    createdAt: order.createdAt,
  }));
};