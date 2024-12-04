import { isObjectEmpty } from '@common/utils/objectUtils';
import { AnswerRepositoryInput } from '@core/domain/repositories/answer/input/AnswerRepositoryInput';
import { Prisma } from '@prisma/client';
import { AnswerIncludeAdapter } from '../include/AnswerIncludeAdapter';

export const AnswerSelectAdapter = (
  select?: AnswerRepositoryInput.AnswerSelect,
  include?: AnswerRepositoryInput.AnswerInclude,
  count?: AnswerRepositoryInput.AnswerCount,
): Prisma.AnswerSelect => {
  if (!select || isObjectEmpty(select)) {
    return {
      id: true,
      ownerId: true,
      questionId: true,
      rate: true,
      text: true,
      isSolution: true,
      createdAt: true,
      updatedAt: true,
      ...AnswerIncludeAdapter(include, count),
    };
  }

  return {
    id: select.id ?? false,
    ownerId: select.ownerId ?? false,
    questionId: select.questionId ?? false,
    rate: select.rate ?? false,
    text: select.text ?? false,
    isSolution: select.isSolution ?? false,
    createdAt: select.createdAt ?? false,
    updatedAt: select.updatedAt ?? false,
    ...AnswerIncludeAdapter(include, count),
  };
};