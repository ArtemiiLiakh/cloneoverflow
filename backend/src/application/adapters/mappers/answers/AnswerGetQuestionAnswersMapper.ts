import { AnswerGetQuestionAnswersResponse } from '@cloneoverflow/common';
import { AnswerGetByQuestionOutput } from '@core/services/answer/dtos';

export const AnswerGetQuestionAnswerMapper = (
  answers: AnswerGetByQuestionOutput,
): AnswerGetQuestionAnswersResponse => {
  return {
    answers: answers.data.map(answer => ({
      id: answer.answerId,
      questionId: answer.questionId,
      text: answer.text,
      rating: answer.rating,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      myVoteType: answer.voter ? answer.voter.voteType : null,
      owner: answer.owner ? {
        id: answer.owner.userId,
        name: answer.owner.name,
        username: answer.owner.username,
        rating: answer.owner.rating,
      } : null,
    })),
    pagination: answers.pagination,
  };
};