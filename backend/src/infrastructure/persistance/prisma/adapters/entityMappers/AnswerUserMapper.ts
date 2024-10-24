import { VoteType } from "@cloneoverflow/common";
import { UserAnswerStatusEnum } from "@common/enums/UserAnswerStatus";
import { AnswerUserStats } from "@core/domain/entities/AnswerUserStats";
import { UserAnswers } from "@prisma/client";

export class AnswerUserStatsMapper {
  static toEntity(user: UserAnswers): AnswerUserStats {
    return AnswerUserStats.new({
      id: user.id,
      userId: user.userId,
      answerId: user.answerId,
      status: user.status as UserAnswerStatusEnum,
      voteType: user.voteType as VoteType,
    });
  }

  static toEntities(users: UserAnswers[]): AnswerUserStats[] {
    return users.map(this.toEntity);
  }
}