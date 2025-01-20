import { AnswerUpdateResponse } from '@cloneoverflow/common';
import { AnswerUpdateOutput } from '@core/services/answer/update/dto';

export function AnswerUpdateMapperOutput (answer: AnswerUpdateOutput): AnswerUpdateResponse {
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