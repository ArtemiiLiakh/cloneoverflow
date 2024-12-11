import { AnswerUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { UserAnswers } from '@prisma/client';

export class AnswerUserMapper {
  static toEntity (user: UserAnswers): AnswerUser {
    return {
      id: user.id,
      userId: user.userId,
      answerId: user.answerId,
      status: user.status as AnswerUserStatusEnum,
      voteType: user.voteType as VoteTypeEnum,
    };
  }
}