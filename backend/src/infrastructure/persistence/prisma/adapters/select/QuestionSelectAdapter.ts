import { Select } from '@common/repository/select';
import { isObjectEmpty } from '@common/utils/objectUtils';
import { Question } from '@core/models/question';
import { Prisma } from '@prisma/client';

export const QuestionSelectAdapter = (
  select?: Select<Question>,
): Prisma.QuestionSelect => {
  if (!select || isObjectEmpty(select)) return {
    id: true,
    title: true,
    text: true,
    rating: true,
    views: true,
    isClosed: true,
    ownerId: true,
    createdAt: true,
    updatedAt: true,
  };

  return {
    id: select.questionId,
    title: select.title,
    text: select.text,
    rating: select.rating,
    views: select.views,
    isClosed: select.isClosed,
    ownerId: select.ownerId,
    createdAt: select.createdAt,
    updatedAt: select.updatedAt,
  };
};