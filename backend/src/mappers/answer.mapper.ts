import { AnswerCreateResponse, AnswerUpdateResponse, AnswerGetResponse } from '@cloneoverflow/common';
import { DbAnswer } from '../types/database/DbAnswer';

export class AnswerMapper {
  create (answer: DbAnswer): AnswerCreateResponse {
    return {
      id: answer.id,
      questionId: answer.questionId,
      userId: answer.userId,
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
    return {
      id: answer.id,
      text: answer.text,
      rate: answer.rate,
      isSolution: answer.isSolution,
      owner:{
        id: answer.userProfile.userId,
        name: answer.userProfile.name,
        username: answer.userProfile.username,
        reputation: answer.userProfile.reputation,
      },
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}