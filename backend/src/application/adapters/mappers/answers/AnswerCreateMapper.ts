import { AnswerCreateResponse } from '@cloneoverflow/common';
import { AnswerCreateOutput } from '@core/services/answer/dtos';

export function AnswerCreateMapperOutput (answer: AnswerCreateOutput): AnswerCreateResponse {
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