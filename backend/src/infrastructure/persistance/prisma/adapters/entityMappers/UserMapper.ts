import { UserStatusEnum } from '@cloneoverflow/common';
import { User } from '@core/domain/entities/User';
import Prisma from '@prisma/client';

export class UserMapper {
  static toEntity (user: Prisma.User): User {
    return {
      id: user.userId,
      name: user.name,
      username: user.username,
      about: user.about,
      rating: user.reputation,
      status: user.status as UserStatusEnum,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}