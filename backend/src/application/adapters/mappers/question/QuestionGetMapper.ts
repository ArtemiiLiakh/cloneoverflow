import { QuestionGetResponse } from '@cloneoverflow/common';
import { QuestionServiceOutput } from '@core/services/question/dtos/QuestionServiceOutput';

export function QuestionGetMapperOutput (
  question: QuestionServiceOutput.Get,
): QuestionGetResponse {
  const owner = question.owner ? {
    id: question.owner.id,
    name: question.owner.name,
    reputation: question.owner.rating,
    username: question.owner.username,
  } : undefined;

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
    voteType: question.userStats?.voteType,
    owner,
  };
}