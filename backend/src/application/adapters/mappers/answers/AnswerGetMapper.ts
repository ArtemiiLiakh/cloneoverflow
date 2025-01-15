import { AnswerGetResponse } from '@cloneoverflow/common';
import { AnswerServiceOutput } from '@core/services/answer/dtos/AnswerServiceOutput';

export function AnswerGetMapperOutput (answer: AnswerServiceOutput.Get): AnswerGetResponse {
  const owner: AnswerGetResponse['owner'] = answer.owner ? {
    id: answer.owner?.id,
    name: answer.owner?.name,
    reputation: answer.owner?.rating,
    username: answer.owner?.username,
  } : undefined;

  const question: AnswerGetResponse['question'] = answer.question ? {
    id: answer.question.id,
    title: answer.question.title,
    rate: answer.question.rating,
    isClosed: answer.question.isClosed,
  } : undefined;

  return {
    id: answer.entity.id,
    text: answer.entity.text,
    rate: answer.entity.rating,
    isSolution: answer.entity.isSolution,
    createdAt: answer.entity.createdAt,
    updatedAt: answer.entity.updatedAt,
    owner,
    question,
    voteType: answer.voter?.voteType,
  };
}