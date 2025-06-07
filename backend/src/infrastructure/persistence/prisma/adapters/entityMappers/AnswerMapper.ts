import { Answer } from '@core/answer/Answer';
import Prisma from '@prisma/client';

export class AnswerMapper {
  static toEntity (answer: Partial<Prisma.Answer>): Answer {
    return Answer.new({
      answerId: answer.id?.toString() ?? '',
      ownerId: answer.ownerId ?? '',
      questionId: answer.questionId?.toString() ?? '',
      text: answer.text ?? '',
      rating: answer.rating ?? 0,
      isSolution: answer.isSolution ?? false,
      createdAt: answer.createdAt ?? new Date(),
      updatedAt: answer.updatedAt ?? new Date(),
    });
  };
}