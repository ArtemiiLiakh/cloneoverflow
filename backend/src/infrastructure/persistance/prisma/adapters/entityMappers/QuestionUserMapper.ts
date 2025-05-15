import { QuestionUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import Prisma from '@prisma/client';
import { bytesToUUID } from '../../utils/uuid';

export class QuestionUserMapper {
  static toEntity (user: Partial<Prisma.QuestionUser>): QuestionUser {
    return QuestionUser.new({
      id: user.id?.toString(),
      userId: user.userId ? bytesToUUID(user.userId) : '',
      questionId: user.questionId?.toString() ?? '',
      status: user.status as QuestionUserStatusEnum,
      voteType: user.voteType as VoteTypeEnum,
    });
  }
}