import { AnswerUpdateResponse } from '@cloneoverflow/common';
import { AnswerServiceOutput } from '@core/services/answer/dtos/AnswerServiceOutput';

export function AnswerUpdateMapperOutput (answer: AnswerServiceOutput.Update): AnswerUpdateResponse {
  return {
    id: answer.id,
    ownerId: answer.ownerId,
    questionId: answer.questionId,
    text: answer.text,
    rate: answer.rate,
    isSolution: answer.isSolution,
    createdAt: answer.createdAt,
  };
}