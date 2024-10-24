import { StringType } from "@common/repository/Datatypes/StringType";
import { Prisma } from "@prisma/client";

export const StringWhereAdapter = (strType: undefined | null | string | StringType): undefined | string | Prisma.StringFilter => {
  if (!strType) return;
  if (typeof strType === 'string') return strType;
  return {
    equals: strType.eq,
    contains: strType.contains,
    in: strType.in,
  };
}