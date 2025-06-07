import { UserGetQuestionsResponse } from '@cloneoverflow/common/api/user';
import { UserGetOwnQuestionsOutput } from '@application/user/usecases/dtos';

export function UserGetOwnQuestionMapperOutput (questions: UserGetOwnQuestionsOutput): UserGetQuestionsResponse {
  return {
    questions: questions.data.map(({ question, tags, answerAmount }) => ({
      id: question.questionId,
      title: question.title,
      rating: question.rating,
      views: question.views,
      isClosed: question.isClosed,
      createdAt: question.createdAt.toISOString(),
      answersAmount: answerAmount,
      tags: tags?.map(tag => tag.name) ?? [],
    })),
    pagination: questions.pagination,
  };
}