import { AnswerCreateResponse, AnswerUpdateResponse, AnswerGetResponse, VoteType } from '@cloneoverflow/common';
import { AnswerUserRelation, DbAnswer } from '@/types/database/DbAnswer';
import { UserAnswerStatus } from '@prisma/client';

export class AnswerMapper {
  create (answer: DbAnswer): AnswerCreateResponse {
    return {
      id: answer.id,
      questionId: answer.questionId,
      userId: answer.ownerId,
      text: answer.text,
      rate: answer.rate,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt,
    };
  }

  update (answer: DbAnswer): AnswerUpdateResponse {
    return {
      id: answer.id,
      text: answer.text,
      rate: answer.rate,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    };
  }

  get (answer: DbAnswer & AnswerUserRelation, voterId?: string): AnswerGetResponse {
    const voter = answer.userAnswers.find(
      (userAnswer) => userAnswer.status === UserAnswerStatus.VOTER && userAnswer.userId === voterId
    );

    return {
      id: answer.id,
      text: answer.text,
      rate: answer.rate,
      isSolution: answer.isSolution,
      owner:{
        id: answer.owner.userId,
        name: answer.owner.name,
        username: answer.owner.username,
        reputation: answer.owner.reputation,
      },
      voteType: voter?.voteType as VoteType,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}