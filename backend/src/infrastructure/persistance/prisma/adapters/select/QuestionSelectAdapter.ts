import { isObjectEmpty } from '@common/utils/objectUtils';
import { QuestionSelectInput } from '@core/domain/repositories/question/dtos/Params';
import { Prisma } from '@prisma/client';

export const QuestionSelectAdapter = (
  select?: QuestionSelectInput,
): Prisma.QuestionSelect => {
  if (!select || isObjectEmpty(select)) return {
    id: true,
    title: true,
    text: true,
    rate: true,
    views: true,
    isClosed: true,
    ownerId: true,
    createdAt: true,
    updatedAt: true,
  };

  return {
    id: select.id,
    title: select.title,
    text: select.text,
    rate: select.rating,
    views: select.views,
    isClosed: select.isClosed,
    ownerId: select.ownerId,
    createdAt: select.createdAt,
    updatedAt: select.updatedAt,
  };
};