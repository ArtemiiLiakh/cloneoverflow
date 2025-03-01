import { UserCreds } from '@core/models/UserCreds';
import Prisma from '@prisma/client';
import { bytesToUUID } from '../../utils/uuid';

export class UserCredsMapper {
  static toEntity (creds: Partial<Prisma.UserCreds>): UserCreds {
    return UserCreds.new({
      id: creds.id ? bytesToUUID(creds.id) : undefined,
      email: creds.email ?? '',
      password: creds.password ?? '',
      createdAt: creds.createdAt,
      updatedAt: creds.updatedAt,
    });
  }
}