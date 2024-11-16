import { QuestionGetResponse } from '@cloneoverflow/common';
import { QuestionServiceOutput } from '@core/service/question/dto/QuestionServiceOutput';

export function QuestionGetMapperOutput (
  question: QuestionServiceOutput.Get,
): QuestionGetResponse {
  const owner = question.owner ? {
    id: question.owner.id,
    name: question.owner.name,
    reputation: question.owner.reputation,
    username: question.owner.username,
  } : undefined;

  return {
    id: question.entity.id,
    title: question.entity.title,
    text: question.entity.text,
    rate: question.entity.rate,
    isClosed: question.entity.isClosed,
    views: question.entity.views,
    createdAt: question.entity.createdAt,
    updatedAt: question.entity.updatedAt,
    tags: question.tags?.map(tag => tag.text),
    voteType: question.userStats?.voteType,
    owner,
  };
}