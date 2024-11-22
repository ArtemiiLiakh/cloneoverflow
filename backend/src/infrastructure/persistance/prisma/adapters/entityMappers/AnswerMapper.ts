import { Answer } from '@core/domain/entities/Answer';
import Prisma from '@prisma/client';

export class AnswerMapper {
  static toEntity (answer: Prisma.Answer): Answer {
    return {
      id: answer.id,
      ownerId: answer.ownerId,
      questionId: answer.questionId,
      text: answer.text,
      rate: answer.rate,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    };
  };

  static toEntities (answers: Prisma.Answer[]): Answer[] {
    return answers.map(this.toEntity);
  }
}