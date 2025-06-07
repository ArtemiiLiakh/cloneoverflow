import { UserGetAnswersResponse } from '@cloneoverflow/common/api/user';
import { UserGetOwnAnswersOutput } from '@application/user/usecases/dtos';

export function UserGetOwnAnswerMapperOutput ({ data, pagination }: UserGetOwnAnswersOutput): UserGetAnswersResponse {
  return {
    answers: data.map(({ answer, question }) => ({
      id: answer.answerId,
      text: answer.text,
      rating: answer.rating,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt.toISOString(),
      updatedAt: answer.updatedAt.toISOString(),
      question: {
        id: question.id,
        title: question.title,
        rating: question.rating,
      },
    })),
    pagination,
  };
}