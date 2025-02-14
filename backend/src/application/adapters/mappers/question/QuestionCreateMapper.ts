import { QuestionCreateResponse } from '@cloneoverflow/common';
import { QuestionCreateOutput } from '@core/services/question/dtos';

export function QuestionCreateMapperOutput (
  question: QuestionCreateOutput,
): QuestionCreateResponse {
  return {
    id: question.id,
    title: question.title,
    text: question.text,
    rate: question.rating,
    views: question.views,
    isClosed: question.isClosed,
    updatedAt: question.updatedAt,
    createdAt: question.createdAt,
  };
}