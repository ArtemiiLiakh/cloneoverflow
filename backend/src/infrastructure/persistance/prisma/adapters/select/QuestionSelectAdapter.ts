import { isObjectEmpty } from '@common/utils/objectUtils';
import { QuestionRepositoryInput } from '@core/domain/repositories/question/input/QuestionRepositoryInput';
import { Prisma } from '@prisma/client';
import { QuestionIncludeAdapter } from '../include/QuestionIncludeAdapter';

export const QuestionSelectAdapter = (
  select?: QuestionRepositoryInput.QuestionSelect,
  include?: QuestionRepositoryInput.QuestionInclude,
  count?: QuestionRepositoryInput.QuestionCount,
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
    ...QuestionIncludeAdapter(include, count),
  };

  return {
    id: select.id ?? false,
    title: select.title ?? false,
    text: select.text ?? false,
    rate: select.rate ?? false,
    views: select.views ?? false,
    isClosed: select.isClosed ?? false,
    ownerId: select.ownerId ?? false,
    createdAt: select.createdAt ?? false,
    updatedAt: select.updatedAt ?? false,
    ...QuestionIncludeAdapter(include, count),
  };
};