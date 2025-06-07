import { QuestionGetAnswersResponse } from '@cloneoverflow/common/api/question';
import { AnswerGetByQuestionOutput } from '@application/answer/usecases/dtos';

export const QuestionGetAnswersMapper = (
  answers: AnswerGetByQuestionOutput,
): QuestionGetAnswersResponse => {
  return {
    answers: answers.data.map(answer => ({
      id: answer.answerId,
      questionId: answer.questionId,
      text: answer.text,
      rating: answer.rating,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt.toISOString(),
      updatedAt: answer.updatedAt.toISOString(),
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