import { QuestionUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { UserQuestions } from '@prisma/client';

export class QuestionUserMapper {
  static toEntity (user: UserQuestions): QuestionUser {
    return {
      id: user.id,
      userId: user.userId,
      questionId: user.questionId,
      status: user.status as QuestionUserStatusEnum,
      voteType: user.voteType as VoteTypeEnum,
    };
  }
}