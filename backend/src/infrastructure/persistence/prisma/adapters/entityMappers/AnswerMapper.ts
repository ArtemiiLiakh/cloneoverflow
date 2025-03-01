import { Answer } from '@core/models/Answer';
import Prisma from '@prisma/client';
import { bytesToUUID } from '../../utils/uuid';

export class AnswerMapper {
  static toEntity (answer: Partial<Prisma.Answer>): Answer {
    return Answer.new({
      id: answer.id?.toString(),
      ownerId: answer.ownerId ? bytesToUUID(answer.ownerId) : '',
      questionId: answer.questionId?.toString() ?? '',
      text: answer.text ?? '',
      rating: answer.rate,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    });
  };
}