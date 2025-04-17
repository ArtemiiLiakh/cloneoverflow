import { QuestionUpdateResponse } from '@cloneoverflow/common';
import { QuestionUpdateOutput } from '@core/services/question/dtos';

export function QuestionUpdateMapperOutput (
  question: QuestionUpdateOutput,
): QuestionUpdateResponse {
  return {
    id: question.questionId,
    ownerId: question.ownerId,
    title: question.title,
    text: question.text,
    rating: question.rating,
    isClosed: question.isClosed,
    views: question.views,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
  };
}