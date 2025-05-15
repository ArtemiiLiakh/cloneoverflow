import { QuestionRepositoryOutput } from '@core/domain/repositories/question/dtos/QuestionRepositoryOutput';
import { QuestionGetManyOutput } from './dto';

export const getManyOutputMapper = (
  questions: QuestionRepositoryOutput.GetMany,
): QuestionGetManyOutput => ({
  data: questions.data.map((question) => ({
    entity: {
      id: question.entity.id!.toString(),
      ownerId: question.entity.ownerId!,
      title: question.entity.title!,
      rating: question.entity.rating!,
      views: question.entity.views!,
      isClosed: question.entity.isClosed!,
      createdAt: question.entity.createdAt!,
    },
    owner: question.owner ? {
      id: question.owner.id,
      name: question.owner.name,
      username: question.owner.username,
      rating: question.owner.rating,
    } : null,
    tags: question.tags ?? [],
    answerAmount: question.counts?.answers ?? 0,
  })),
  pagination: questions.pagination,
});