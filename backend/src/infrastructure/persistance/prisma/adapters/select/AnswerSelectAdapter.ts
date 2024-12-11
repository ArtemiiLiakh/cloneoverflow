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
    id: select.id ?? false,
    ownerId: select.ownerId ?? false,
    questionId: select.questionId ?? false,
    rate: select.rating ?? false,
    text: select.text ?? false,
    isSolution: select.isSolution ?? false,
    createdAt: select.createdAt ?? false,
    updatedAt: select.updatedAt ?? false,
  };
};