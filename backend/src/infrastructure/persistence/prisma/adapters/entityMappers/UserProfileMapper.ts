import { UserStatusEnum } from '@cloneoverflow/common';
import { UserProfile } from '@core/user/UserProfile';
import Prisma from '@prisma/client';

interface UserProfileDetails {
  email: string, 
  answerAmount: number,
  questionAmount: number,
}

export class UserProfileMapper {
  static toEntity (user: Prisma.User, details: UserProfileDetails): UserProfile {
    return UserProfile.new({
      userId: user.id,
      email: details.email,
      name: user.name,
      username: user.username,
      rating: user.rating,
      status: user.status as UserStatusEnum,
      about: user.about,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      answerAmount: details.answerAmount,
      questionAmount: details.questionAmount,
    });
  }
}
