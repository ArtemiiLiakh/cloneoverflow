import { UserAnswerStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerUserStats } from '@core/domain/entities/AnswerUserStats';
import { UserAnswers } from '@prisma/client';

export class AnswerUserStatsMapper {
  static toEntity (user: UserAnswers): AnswerUserStats {
    return {
      id: user.id,
      userId: user.userId,
      answerId: user.answerId,
      status: user.status as UserAnswerStatusEnum,
      voteType: user.voteType as VoteTypeEnum,
    };
  }

  static toEntities (users: UserAnswers[]): AnswerUserStats[] {
    return users.map(this.toEntity);
  }
}