import { VoteType } from "@cloneoverflow/common";
import { UserQuestionStatusEnum } from "@common/enums/UserQuestionStatus";
import { QuestionUserStats } from "@core/domain/entities/QuestionUserStats";
import { UserQuestions } from "@prisma/client";

export class QuestionUserStatsMapper {
  static toEntity(user: UserQuestions): QuestionUserStats {
    return QuestionUserStats.new({
      id: user.id,
      userId: user.userId,
      questionId: user.questionId,
      status: user.status as UserQuestionStatusEnum,
      voteType: user.voteType as VoteType,
    });
  }

  static toEntities(users: UserQuestions[]): QuestionUserStats[] {
    return users.map(this.toEntity);
  }
}