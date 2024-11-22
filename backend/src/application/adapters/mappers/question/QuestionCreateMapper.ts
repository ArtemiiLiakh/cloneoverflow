import { QuestionCreateResponse } from '@cloneoverflow/common';
import { QuestionServiceOutput } from '@core/service/question/dto/QuestionServiceOutput';

export function QuestionCreateMapperOutput (
  question: QuestionServiceOutput.Create,
): QuestionCreateResponse {
  return {
    id: question.id,
    title: question.title,
    text: question.text,
    rate: question.rate,
    views: question.views,
    isClosed: question.isClosed,
    updatedAt: question.updatedAt,
    createdAt: question.createdAt,
  };
}