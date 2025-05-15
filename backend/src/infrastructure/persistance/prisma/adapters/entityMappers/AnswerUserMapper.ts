import { AnswerUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import Prisma from '@prisma/client';
import { bytesToUUID } from '../../utils/uuid';

export class AnswerUserMapper {
  static toEntity (user: Partial<Prisma.AnswerUser>): AnswerUser {
    return AnswerUser.new({
      id: user.id?.toString(),
      userId: user.userId ? bytesToUUID(user.userId) : '',
      answerId: user.answerId?.toString() ?? '',
      status: user.status as AnswerUserStatusEnum,
      voteType: user.voteType as VoteTypeEnum,
    });
  }
}