import { SearchQuestionsResponse } from '@cloneoverflow/common';
import { SearchServiceOutput } from '@core/services/search/dtos/SearchServiceOutput';

export function SearchQuestionsMapperOutput (
  questions: SearchServiceOutput.SearchQuestions,
): SearchQuestionsResponse {
  return {
    questions: questions.data.map(question => ({
      id: question.entity.questionId,
      title: question.entity.title,
      rate: question.entity.rating,
      views: question.entity.views,
      isClosed: question.entity.isClosed,
      createdAt: question.entity.createdAt,
      answersAmount: question.answersAmount,
      owner: {
        id: question.owner.userId,
        name: question.owner.name,
        reputation: question.owner.rating,
        username: question.owner.username,
      },
      tags: question.tags.map(tag => tag.name),
    })),
    pagination: questions.pagination,
  };
}