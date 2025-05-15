import { AnswerGetAllResponse } from '@cloneoverflow/common';
import { AnswerGetManyOutput } from '@core/services/answer/dtos';

export const AnswerGetManyMapper = (
  { data, pagination }: AnswerGetManyOutput,
): AnswerGetAllResponse => {
  return {
    answers: data.map((answer) => ({
      id: answer.entity.id,
      questionId: answer.entity.questionId,
      rate: answer.entity.rating,
      text: answer.entity.text,
      isSolution: answer.entity.isSolution,
      createdAt: answer.entity.createdAt,
      updatedAt: answer.entity.updatedAt,
      owner: answer.owner ? {
        id: answer.owner.id,
        name: answer.owner.name,
        reputation: answer.owner.rating,
        username: answer.owner.username,
      } : null,
    })),
    pagination,
  };
};