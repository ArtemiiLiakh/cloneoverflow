import { UserGetAnswersResponse } from '@cloneoverflow/common';
import { AnswerServiceOutput } from '@core/service/answer/dto/AnswerServiceOutput';

export function UserGetAnswerMapperOutput ({ data, pagination }: AnswerServiceOutput.GetAll): UserGetAnswersResponse {
  return {
    answers: data.map(answer => ({
      id: answer.entity.id,
      text: answer.entity.text,
      rate: answer.entity.rate,
      isSolution: answer.entity.isSolution,
      createdAt: answer.entity.createdAt,
      updatedAt: answer.entity.updatedAt,
      question: {
        id: answer.question.id,
        title: answer.question.title,
        rate: answer.question.rate,
      },
    })),
    pagination,
  };
}