import { QuestionUpdateResponse } from '@cloneoverflow/common';
import { QuestionUpdateOutput } from '@core/services/question/dtos';

export function QuestionUpdateMapperOutput (
  question: QuestionUpdateOutput,
): QuestionUpdateResponse {
  return {
    id: question.id,
    title: question.title,
    text: question.text,
    rate: question.rating,
    isClosed: question.isClosed,
    views: question.views,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
  };
}