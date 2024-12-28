import { Answer } from '@core/domain/entities/Answer';
import Prisma from '@prisma/client';

export class AnswerMapper {
  static toEntity (answer: Prisma.Answer): Answer {
    return {
      id: answer.answerId,
      ownerId: answer.ownerId,
      questionId: answer.questionId,
      text: answer.text,
      rating: answer.rate,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    };
  };
}