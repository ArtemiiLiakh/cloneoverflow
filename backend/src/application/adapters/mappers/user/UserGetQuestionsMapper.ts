import { UserGetQuestionResponse } from '@cloneoverflow/common';
import { QuestionGetManyOutput } from '@core/services/question/dtos';

export function UserGetQuestionMapperOutput (questions: QuestionGetManyOutput): UserGetQuestionResponse {
  return {
    questions: questions.data.map(question => ({
      id: question.entity.id,
      title: question.entity.title,
      rate: question.entity.rating,
      views: question.entity.views,
      isClosed: question.entity.isClosed,
      createdAt: question.entity.createdAt,
      answersAmount: question.answerAmount ?? 0,
      tags: question.tags?.map(tag => tag.name) ?? [],
    })),
    pagination: questions.pagination,
  };
}