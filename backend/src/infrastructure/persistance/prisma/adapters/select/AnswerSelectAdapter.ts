import { isObjectEmpty } from '@common/utils/objectUtils';
import { AnswerSelectInput } from '@core/domain/repositories/answer/dtos/Params';
import { Prisma } from '@prisma/client';

export const AnswerSelectAdapter = (
  select?: AnswerSelectInput,
): Prisma.AnswerSelect => {
  if (!select || isObjectEmpty(select)) {
    return {
      id: true,
      ownerId: true,
      questionId: true,
      text: true,
      rate: true,
      isSolution: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  return {
    id: select.id,
    ownerId: select.ownerId,
    questionId: select.questionId,
    rate: select.rating,
    text: select.text,
    isSolution: select.isSolution,
    createdAt: select.createdAt,
    updatedAt: select.updatedAt,
  };
};