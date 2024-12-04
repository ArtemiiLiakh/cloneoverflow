import { QuestionUpdateResponse } from '@cloneoverflow/common';
import { QuestionServiceOutput } from '@core/services/question/dtos/QuestionServiceOutput';

export function QuestionUpdateMapperOutput (
  question: QuestionServiceOutput.Update,
): QuestionUpdateResponse {
  return {
    id: question.id,
    title: question.title,
    text: question.text,
    rate: question.rate,
    isClosed: question.isClosed,
    views: question.views,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
  };
}