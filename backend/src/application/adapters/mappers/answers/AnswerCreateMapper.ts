import { AnswerCreateResponse } from '@cloneoverflow/common';
import { AnswerServiceOutput } from '@core/services/answer/dtos/AnswerServiceOutput';

export function AnswerCreateMapperOutput (answer: AnswerServiceOutput.Create): AnswerCreateResponse {
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