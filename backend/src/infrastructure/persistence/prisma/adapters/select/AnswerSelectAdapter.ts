import { Select } from '@common/repository/select';
import { isObjectEmpty } from '@common/utils/objectUtils';
import { Answer } from '@core/answer';
import { Prisma } from '@prisma/client';

export const AnswerSelectAdapter = (
  select?: Select<Answer>,
): Prisma.AnswerSelect => {
  if (!select || isObjectEmpty(select)) {
    return {
      id: true,
      ownerId: true,
      questionId: true,
      text: true,
      rating: true,
      isSolution: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  return {
    id: select.answerId,
    ownerId: select.ownerId,
    questionId: select.questionId,
    rating: select.rating,
    text: select.text,
    isSolution: select.isSolution,
    createdAt: select.createdAt,
    updatedAt: select.updatedAt,
  };
};