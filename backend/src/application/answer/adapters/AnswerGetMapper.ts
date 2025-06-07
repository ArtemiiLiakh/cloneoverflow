import { AnswerGetResponse } from '@cloneoverflow/common/api/answer';
import { AnswerGetOutput } from '@application/answer/usecases/dtos';

export function AnswerGetMapperOutput (answer: AnswerGetOutput): AnswerGetResponse {
  return {
    id: answer.answerId,
    questionId: answer.questionId,
    text: answer.text,
    rating: answer.rating,
    isSolution: answer.isSolution,
    createdAt: answer.createdAt.toISOString(),
    updatedAt: answer.updatedAt.toISOString(),
    owner: answer.owner ? {
      id: answer.owner.userId,
      name: answer.owner.name,
      rating: answer.owner.rating,
      username: answer.owner.username,
    } : null,
    myVoteType: answer.voter ? answer.voter.voteType : null,
  };
}