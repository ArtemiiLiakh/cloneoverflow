import { UserStatusEnum } from '@cloneoverflow/common';
import { User } from '@core/domain/entities/User';
import Prisma from '@prisma/client';
import { bytesToUUID } from '../../utils/uuid';

export class UserMapper {
  static toEntity (user: Partial<Prisma.User>): User {
    return User.new({
      id: user.id ? bytesToUUID(user.id) : undefined,
      name: user.name ?? '',
      username: user.username ?? '',
      rating: user.reputation,
      status: user.status as UserStatusEnum,
      about: user.about,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}