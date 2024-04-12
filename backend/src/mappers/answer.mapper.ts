import { AnswerCreateResponse, AnswerUpdateResponse } from '@cloneoverflow/common';
import { DbAnswer } from '../types/database/DbAnswer';

export class AnswerMapper {
  getAnswer (answer: DbAnswer): AnswerCreateResponse {
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
}