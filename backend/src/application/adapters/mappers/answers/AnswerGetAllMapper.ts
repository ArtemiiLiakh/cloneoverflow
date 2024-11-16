import { AnswerGetAllResponse } from '@cloneoverflow/common';
import { AnswerServiceOutput } from '@core/service/answer/dto/AnswerServiceOutput';

export const AnswerGetAllMapper = (
  { data, pagination }: AnswerServiceOutput.GetAll,
): AnswerGetAllResponse => {
  return {
    answers: data.map((answer) => ({
      id: answer.entity.id,
      questionId: answer.entity.questionId,
      rate: answer.entity.rate,
      text: answer.entity.text,
      isSolution: answer.entity.isSolution,
      createdAt: answer.entity.createdAt,
      updatedAt: answer.entity.updatedAt,
      owner: {
        id: answer.owner.id,
        name: answer.owner.name,
        reputation: answer.owner.reputation,
        username: answer.owner.username,
      },
      voteType: answer.userStats?.voteType,
    })),
    pagination,
  };
};