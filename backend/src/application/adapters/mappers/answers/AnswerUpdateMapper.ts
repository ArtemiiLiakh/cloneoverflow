import { AnswerUpdateResponse } from '@cloneoverflow/common';
import { AnswerServiceOutput } from '@core/services/answer/dtos/AnswerServiceOutput';

export function AnswerUpdateMapperOutput (answer: AnswerServiceOutput.Update): AnswerUpdateResponse {
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