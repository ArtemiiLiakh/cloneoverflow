import { AnswerCreateResponse } from '@cloneoverflow/common';
import { AnswerCreateOutput } from '@core/services/answer/create/dto';

export function AnswerCreateMapperOutput (answer: AnswerCreateOutput): AnswerCreateResponse {
  return {
    id: answer.id,
    ownerId: answer.ownerId,
    questionId: answer.questionId,
    text: answer.text,
    rate: answer.rating,
    isSolution: answer.isSolution,
    createdAt: answer.createdAt,
  };
}