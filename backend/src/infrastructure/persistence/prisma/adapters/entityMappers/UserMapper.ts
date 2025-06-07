import { UserStatusEnum } from '@cloneoverflow/common';
import { User } from '@core/user/User';
import Prisma from '@prisma/client';

export class UserMapper {
  static toEntity (user: Partial<Prisma.User>): User {
    return User.new({
      userId: user.id ?? '',
      name: user.name ?? '',
      username: user.username ?? '',
      rating: user.rating ?? 0,
      status: user.status as UserStatusEnum,
      createdAt: user.createdAt ?? new Date(),
      updatedAt: user.updatedAt ?? new Date(),
    });
  }
}