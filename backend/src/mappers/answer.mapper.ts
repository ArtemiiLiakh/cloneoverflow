import { AnswerCreateResponse, AnswerUpdateResponse, AnswerGetResponse } from '@cloneoverflow/common';
import { DbAnswer } from '../types/database/DbAnswer';

export class AnswerMapper {
  create (answer: DbAnswer): AnswerCreateResponse {
    return {
      id: answer.id,
      questionId: answer.questionId,
      userId: answer.userAnswers[0].userId,
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

  get (answer: DbAnswer): AnswerGetResponse {
    const owner = answer.userAnswers[0].userProfile;

    return {
      id: answer.id,
      text: answer.text,
      rate: answer.rate,
      isSolution: answer.isSolution,
      owner:{
        id: owner.userId,
        name: owner.name,
        username: owner.username,
        reputation: owner.reputation,
      },
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}