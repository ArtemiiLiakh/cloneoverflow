import { UserGetAnswersResponse } from '@cloneoverflow/common';
import { UserGetOwnAnswersOutput } from '@core/services/user/dtos';

export function UserGetOwnAnswerMapperOutput ({ data, pagination }: UserGetOwnAnswersOutput): UserGetAnswersResponse {
  return {
    answers: data.map(({ answer, question }) => ({
      id: answer.answerId,
      text: answer.text,
      rating: answer.rating,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      question: {
        id: question.id,
        title: question.title,
        rating: question.rating,
      },
    })),
    pagination,
  };
}