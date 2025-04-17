import { AnswerUpdateResponse } from '@cloneoverflow/common';
import { AnswerUpdateOutput } from '@core/services/answer/dtos';

export function AnswerUpdateMapperOutput (answer: AnswerUpdateOutput): AnswerUpdateResponse {
  return {
    id: answer.answerId,
    ownerId: answer.ownerId,
    questionId: answer.questionId,
    text: answer.text,
    rating: answer.rating,
    isSolution: answer.isSolution,
    createdAt: answer.createdAt,
  };
}