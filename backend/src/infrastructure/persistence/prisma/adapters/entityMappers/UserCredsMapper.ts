import { UserCreds } from '@core/models/user/UserCreds';
import Prisma from '@prisma/client';

export class UserCredsMapper {
  static toEntity (creds: Partial<Prisma.UserCreds>): UserCreds {
    return UserCreds.new({
      userId: creds.id ?? '',
      email: creds.email ?? '',
      password: creds.password ?? '',
      createdAt: creds.createdAt ?? new Date(),
      updatedAt: creds.updatedAt ?? new Date(),
    });
  }
}