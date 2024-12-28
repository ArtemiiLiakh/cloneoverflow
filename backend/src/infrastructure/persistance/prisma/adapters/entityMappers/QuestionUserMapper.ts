import { QuestionUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import Prisma from '@prisma/client';

export class QuestionUserMapper {
  static toEntity (user: Prisma.QuestionUser): QuestionUser {
    return {
      id: user.questionUserId,
      userId: user.userId,
      questionId: user.questionId,
      status: user.status as QuestionUserStatusEnum,
      voteType: user.voteType as VoteTypeEnum,
    };
  }
}