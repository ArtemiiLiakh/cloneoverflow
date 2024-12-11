import { UserOrderBy, UserOrderByType } from '@core/domain/repositories/user/dtos/Params';
import { Prisma } from '@prisma/client';
import { MapArrayOrValue } from './utils/MapArrayOrValue';

export const UserOrderByAdapter = (
  orderBy?: UserOrderBy,
): Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[] => {
  if (!orderBy) return {};

  return MapArrayOrValue<
    UserOrderByType, 
    Prisma.UserOrderByWithRelationInput
  >(orderBy, (order) => ({
    name: order.name, 
    username: order.username,
    reputation: order.rating,
    status: order.status,
    createdAt: order.createdAt,
    questions: order.questionsAmount ? undefined : {
      _count: order.questionsAmount,
    },
    answers: !order.answersAmount ? undefined : {
      _count: order.answersAmount,
    },
  }));
};