import { UserStatus } from "@cloneoverflow/common";
import { User } from "@core/domain/entities/User";
import Prisma from "@prisma/client";

export class UserMapper {
  static toEntity(user: Prisma.User): User {
    return User.new({
      id: user.userId,
      name: user.name,
      username: user.username,
      about: user.about ?? undefined,
      reputation: user.reputation,
      status: user.status as UserStatus,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}