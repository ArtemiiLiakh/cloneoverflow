import { UserGetAnswersResponse } from '@cloneoverflow/common';
import { AnswerGetManyOutput } from '@core/services/answer/dtos';

export function UserGetAnswerMapperOutput ({ data, pagination }: AnswerGetManyOutput): UserGetAnswersResponse {
  return {
    answers: data.map(answer => ({
      id: answer.entity.id,
      text: answer.entity.text,
      rate: answer.entity.rating,
      isSolution: answer.entity.isSolution,
      createdAt: answer.entity.createdAt,
      updatedAt: answer.entity.updatedAt,
      question: {
        id: answer.question.id,
        title: answer.question.title,
        rate: answer.question.rating,
      },
    })),
    pagination,
  };
}