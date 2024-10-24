import { TagRepositoryInput } from "@core/domain/repositories/tag/input/TagRepositoryInput";
import { Prisma } from "@prisma/client";
import { DateWhereAdapter } from "../dataTypes/DateWhereAdapter";
import { StringWhereAdapter } from "../dataTypes/StringWhereAdapter";
import { TagWhereAdapter } from "./TagWhereAdapter";

export const TagWhereInputAdapter = (where: TagRepositoryInput.TagWhere): Prisma.TagWhereInput => {
  return {
    id: StringWhereAdapter(where.id),
    name: StringWhereAdapter(where.text),
    createdAt: DateWhereAdapter(where.createdAt),
    updatedAt: DateWhereAdapter(where.updatedAt),
    OR: where.OR?.map((item) => TagWhereAdapter(item)),
    AND: where.AND?.map((item) => TagWhereAdapter(item)),
  }
};