import { AnswerCreateResponse } from '../responses/answer.create.response';
import { DbAnswer } from '../types/database/DbAnswer';
import { AnswerUpdateResponse } from "../responses/answer.update.response";

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