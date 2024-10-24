import { AnswerRepositoryInput } from "@core/domain/repositories/answer/input/AnswerRepositoryInput";
import { Prisma } from "@prisma/client";
import { ArrayOrValue } from "./utils/ArrayOrValue";

export const AnswerOrderByAdapter = (
  orderBy: AnswerRepositoryInput.AnswerFindManyRepositoryOptions["orderBy"] | undefined,
): Prisma.AnswerOrderByWithRelationInput | Prisma.AnswerOrderByWithRelationInput[] => {
  if (!orderBy) return {};

  return ArrayOrValue(orderBy, (order) => ({
    id: order.id,
    ownerId: order.ownerId,
    questionId: order.questionId,
    isSolution: order.isSolution,
    rate: order.rate,
    text: order.text,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }));
}