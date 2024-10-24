import { UserRepositoryInput } from "@core/domain/repositories/user/input/UserRepositoryInput";
import { Prisma } from "@prisma/client";
import { StringWhereAdapter } from "../dataTypes/StringWhereAdapter";
import { DateWhereAdapter } from "../dataTypes/DateWhereAdapter";
import { UserWhereAdapter } from "./UserWhereAdapter";

export const UserCredsWhereAdapter = (where: UserRepositoryInput.UserCredsWhere): Prisma.UserCredsWhereInput => {
  return {
    id: StringWhereAdapter(where.id),
    email: StringWhereAdapter(where.email),
    password: StringWhereAdapter(where.password),
    createdAt: DateWhereAdapter(where.createdAt),
    updatedAt: DateWhereAdapter(where.updatedAt),
    OR: where.OR?.map(cred => UserCredsWhereAdapter(cred)),
    user: UserWhereAdapter(where),
  };
}