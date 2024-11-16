import { UserGetQuestionResponse } from '@cloneoverflow/common';
import { QuestionServiceOutput } from '@core/service/question/dto/QuestionServiceOutput';

export function UserGetQuestionMapperOutput (questions: QuestionServiceOutput.GetAll): UserGetQuestionResponse {
  return {
    questions: questions.data.map(question => ({
      id: question.entity.id,
      title: question.entity.title,
      text: question.entity.text,
      rate: question.entity.rate,
      views: question.entity.views,
      isClosed: question.entity.isClosed,
      createdAt: question.entity.createdAt,
      updatedAt: question.entity.updatedAt,
      answersAmount: question.answerAmount ?? 0,
      tags: question.tags?.map(tag => tag.text) ?? [],
    })),
    pagination: questions.pagination,
  };
}