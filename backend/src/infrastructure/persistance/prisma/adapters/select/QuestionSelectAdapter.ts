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
    id: select.id ?? false,
    title: select.title ?? false,
    text: select.text ?? false,
    rate: select.rating ?? false,
    views: select.views ?? false,
    isClosed: select.isClosed ?? false,
    ownerId: select.ownerId ?? false,
    createdAt: select.createdAt ?? false,
    updatedAt: select.updatedAt ?? false,
  };
};