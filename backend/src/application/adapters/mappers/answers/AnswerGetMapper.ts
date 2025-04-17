import { AnswerGetResponse } from '@cloneoverflow/common';
import { AnswerGetOutput } from '@core/services/answer/dtos';

export function AnswerGetMapperOutput (answer: AnswerGetOutput): AnswerGetResponse {
  return {
    id: answer.answerId,
    questionId: answer.questionId,
    text: answer.text,
    rating: answer.rating,
    isSolution: answer.isSolution,
    createdAt: answer.createdAt,
    updatedAt: answer.updatedAt,
    owner: answer.owner ? {
      id: answer.owner.userId,
      name: answer.owner.name,
      rating: answer.owner.rating,
      username: answer.owner.username,
    } : null,
    myVoteType: answer.voter ? answer.voter.voteType : null,
  };
}