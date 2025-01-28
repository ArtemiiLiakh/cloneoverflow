import { AnswerGetResponse } from '@cloneoverflow/common';
import { AnswerGetOutput } from '@core/services/answer/get/dto';

export function AnswerGetMapperOutput (answer: AnswerGetOutput): AnswerGetResponse {
  return {
    id: answer.entity.id,
    text: answer.entity.text,
    rate: answer.entity.rating,
    isSolution: answer.entity.isSolution,
    createdAt: answer.entity.createdAt,
    updatedAt: answer.entity.updatedAt,
    owner: answer.owner ? {
      id: answer.owner.id,
      name: answer.owner.name,
      reputation: answer.owner.rating,
      username: answer.owner.username,
    } : null,
    question: {
      id: answer.question.id,
      title: answer.question.title,
      rate: answer.question.rating,
      isClosed: answer.question.isClosed,
    },
  };
}