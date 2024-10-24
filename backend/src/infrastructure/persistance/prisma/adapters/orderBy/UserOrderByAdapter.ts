import { UserRepositoryInput } from "@core/domain/repositories/user/input/UserRepositoryInput";
import { Prisma } from "@prisma/client";
import { ArrayOrValue } from "./utils/ArrayOrValue";

export const UserOrderByAdapter = (
  orderBy: UserRepositoryInput.UserFindManyRepositoryOptions["orderBy"] | undefined
): Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[] => {
  if (!orderBy) return {};

  return ArrayOrValue(orderBy, (order) => ({
    userId: order.id,
    name: order.name,
    username: order.username,
    reputation: order.reputation,
    status: order.status,
    about: order.about,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    answers: order.answers ? {
      _count: order.answers,
    } : undefined,
    questions: order.questions ? {
      _count: order.questions,
    } : undefined,
  }));
}