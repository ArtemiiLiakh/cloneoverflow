import { QuestionGetResponse } from '@cloneoverflow/common';
import { QuestionGetOutput } from '@core/services/question/dtos';

export function QuestionGetMapperOutput (
  question: QuestionGetOutput,
): QuestionGetResponse {
  return {
    id: question.entity.id,
    title: question.entity.title,
    text: question.entity.text,
    rate: question.entity.rating,
    isClosed: question.entity.isClosed,
    views: question.entity.views,
    createdAt: question.entity.createdAt,
    updatedAt: question.entity.updatedAt,
    tags: question.tags?.map(tag => tag.name),
    owner: question.owner ? {
      id: question.owner.id,
      name: question.owner.name,
      username: question.owner.username,
      reputation: question.owner.rating,
    } : null,
  };
}