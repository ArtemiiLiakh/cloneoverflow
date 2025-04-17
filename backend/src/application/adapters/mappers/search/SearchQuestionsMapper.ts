import { SearchQuestionsResponse } from '@cloneoverflow/common';
import { SearchQuestionsOutput } from '@core/services/search/dtos';

export function SearchQuestionsMapperOutput (
  questions: SearchQuestionsOutput,
): SearchQuestionsResponse {
  return {
    questions: questions.data.map(question => ({
      id: question.entity.questionId,
      title: question.entity.title,
      rating: question.entity.rating,
      views: question.entity.views,
      isClosed: question.entity.isClosed,
      createdAt: question.entity.createdAt,
      answersAmount: question.answersAmount,
      owner: question.owner ? {
        id: question.owner.userId,
        name: question.owner.name,
        rating: question.owner.rating,
        username: question.owner.username,
      } : null,
      tags: question.tags.map(tag => tag.name),
    })),
    pagination: questions.pagination,
  };
}