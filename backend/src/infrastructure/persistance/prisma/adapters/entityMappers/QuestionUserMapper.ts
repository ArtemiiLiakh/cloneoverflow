import { UserQuestionStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionUserStats } from '@core/domain/entities/QuestionUserStats';
import { UserQuestions } from '@prisma/client';

export class QuestionUserStatsMapper {
  static toEntity (user: UserQuestions): QuestionUserStats {
    return {
      id: user.id,
      userId: user.userId,
      questionId: user.questionId,
      status: user.status as UserQuestionStatusEnum,
      voteType: user.voteType as VoteTypeEnum,
    };
  }

  static toEntities (users: UserQuestions[]): QuestionUserStats[] {
    return users.map(this.toEntity);
  }
}