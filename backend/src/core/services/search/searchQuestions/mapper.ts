import { QuestionRepositoryOutput } from '@core/domain/repositories/question/dtos/QuestionRepositoryOutput';
import { SearchQuestionsOutput } from './dto';

export const searchQuestionsOutputMapper = (
  questions: QuestionRepositoryOutput.GetMany,
): SearchQuestionsOutput => ({
  data: questions.data.map(question => ({
    entity: {
      questionId: question.entity.id!,
      ownerId: question.entity.ownerId!,
      title: question.entity.title!,
      rating: question.entity.rating!,
      views: question.entity.views!,
      isClosed: question.entity.isClosed!,
      createdAt: question.entity.createdAt!,
    },
    owner: question.owner ? {
      userId: question.owner.id,
      name: question.owner.name,
      username: question.owner.username,
      rating: question.owner.rating,
    } : null,
    tags: question.tags ?? [],
    answersAmount: question.counts?.answers ?? 0,
  })),
  pagination: questions.pagination,
});