import { UserRepositoryInput } from "@core/domain/repositories/user/input/UserRepositoryInput"
import { Prisma } from "@prisma/client"
import { DateWhereAdapter } from "../dataTypes/DateWhereAdapter"
import { NumberWhereAdapter } from "../dataTypes/NumberWhereAdapter "
import { StringWhereAdapter } from "../dataTypes/StringWhereAdapter"
import { UserWhereAdapter } from "./UserWhereAdapter"

export const UserWhereInputAdapter = (where: UserRepositoryInput.UserWhere): Prisma.UserWhereInput => {
  return {
    userId: StringWhereAdapter(where.id),
    name: StringWhereAdapter(where.name),
    username: StringWhereAdapter(where.username),
    reputation: NumberWhereAdapter(where.reputation),
    about: StringWhereAdapter(where.about),
    status: StringWhereAdapter(where.status) as Prisma.EnumUserStatusFilter,
    createdAt: DateWhereAdapter(where.createdAt),
    updatedAt: DateWhereAdapter(where.updatedAt),
    OR: where.OR?.map((item) => UserWhereAdapter(item)),
    AND: where.AND?.map((item) => UserWhereAdapter(item)),
  }
}