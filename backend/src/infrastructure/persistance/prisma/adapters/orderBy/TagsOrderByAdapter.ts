import { TagRepositoryInput } from "@core/domain/repositories/tag/input/TagRepositoryInput";
import { Prisma } from "@prisma/client";
import { ArrayOrValue } from "./utils/ArrayOrValue";

export const TagOrderByAdapter = (
  orderBy: TagRepositoryInput.TagFindManyRepositoryOptions["orderBy"] | undefined,
): Prisma.TagOrderByWithRelationInput | Prisma.TagOrderByWithRelationInput[] => {
  if (!orderBy) return {};

  return ArrayOrValue(orderBy, (order) => ({
    id: order.id,
    name: order.text,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    questions: order.questions ? {
      _count: order.questions,
    } : undefined,
  }));
}