import { AnswerUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import Prisma from '@prisma/client';

export class AnswerUserMapper {
  static toEntity (user: Prisma.AnswerUser): AnswerUser {
    return {
      id: user.answerUserId,
      userId: user.userId,
      answerId: user.answerId,
      status: user.status as AnswerUserStatusEnum,
      voteType: user.voteType as VoteTypeEnum,
    };
  }
}