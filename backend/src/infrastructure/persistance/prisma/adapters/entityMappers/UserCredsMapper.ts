import { UserCreds } from '@core/domain/entities/UserCreds';
import Prisma from '@prisma/client';

export class UserCredsMapper {
  static toEntity (creds: Prisma.UserCreds): UserCreds {
    return {
      id: creds.userId,
      email: creds.email,
      password: creds.password,
      createdAt: creds.createdAt,
      updatedAt: creds.updatedAt,
    };
  }
}