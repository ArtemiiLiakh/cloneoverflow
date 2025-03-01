import { QuestionOrderBy, QuestionOrderByType } from '@core/repositories/question/dtos/Params';
import { Prisma } from '@prisma/client';
import { MapArrayOrValue } from './utils/MapArrayOrValue';

export const QuestionOrderByAdapter = (
  orderBy: QuestionOrderBy | undefined,
): Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[] => {
  if (!orderBy) return {};

  return MapArrayOrValue<
    QuestionOrderByType, 
    Prisma.QuestionOrderByWithRelationInput
  >(orderBy, (order) => ({
    title: order.title,
    text: order.text,
    rate: order.rating,
    views: order.views,
    isClosed: order.isClosed,
    createdAt: order.createdAt,
    answers: !order.answersAmount ? undefined : {
      _count: order.answersAmount,
    },
  }));
};