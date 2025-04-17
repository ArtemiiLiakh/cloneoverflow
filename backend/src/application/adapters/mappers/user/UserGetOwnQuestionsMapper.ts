import { UserGetQuestionsResponse } from '@cloneoverflow/common';
import { UserGetOwnQuestionsOutput } from '@core/services/user/dtos';

export function UserGetOwnQuestionMapperOutput (questions: UserGetOwnQuestionsOutput): UserGetQuestionsResponse {
  return {
    questions: questions.data.map(({ question, tags, answerAmount }) => ({
      id: question.questionId,
      title: question.title,
      rating: question.rating,
      views: question.views,
      isClosed: question.isClosed,
      createdAt: question.createdAt,
      answersAmount: answerAmount,
      tags: tags?.map(tag => tag.name) ?? [],
    })),
    pagination: questions.pagination,
  };
}