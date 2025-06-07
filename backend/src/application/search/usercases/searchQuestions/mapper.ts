import { QuestionRepoSearchOutput } from '@core/question/repository/dtos/Search';
import { SearchQuestionsOutput } from './dto';

export const searchQuestionsOutputMapper = (
  questions: QuestionRepoSearchOutput,
): SearchQuestionsOutput => ({
  data: questions.data.map(({ question, owner, tags, answersAmount })  => ({
    entity: {
      questionId: question.questionId,
      ownerId: question.ownerId,
      title: question.title,
      rating: question.rating,
      views: question.views,
      isClosed: question.isClosed,
      createdAt: question.createdAt,
    },
    owner: owner ? {
      userId: owner.userId,
      name: owner.name,
      username: owner.username,
      rating: owner.rating,
    } : null,
    tags,
    answersAmount,
  })),
  pagination: questions.pagination,
});