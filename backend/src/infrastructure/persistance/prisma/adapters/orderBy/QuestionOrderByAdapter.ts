import { QuestionRepositoryInput } from '@core/domain/repositories/question/input/QuestionRepositoryInput';
import { Prisma } from '@prisma/client';
import { ArrayOrValue } from './utils/ArrayOrValue';

export const QuestionOrderByAdapter = (
  orderBy: QuestionRepositoryInput.QuestionOrderBy | QuestionRepositoryInput.QuestionOrderBy[] | undefined,
): Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[] => {
  if (!orderBy) return {};

  const order = ArrayOrValue(orderBy, (order) => ({
    id: order.id,
    ownerId: order.ownerId,
    rate: order.rate,
    title: order.title,
    text: order.text,
    isClosed: order.isClosed,
    views: order.views,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    tags: order.tags ? {
      _count: order.tags,
    } : undefined,
    answers: order.answers ? {
      _count: order.answers,
    } : undefined,
  }));
  
  return order;
};