import { DateType } from "@common/repository/Datatypes/DateType";
import { Prisma } from "@prisma/client";

export const DateWhereAdapter = (dateType?: undefined | null | Date | DateType): undefined | Date | Prisma.DateTimeFilter => {
  if (!dateType) return;
  if (dateType instanceof Date ) return dateType;
  return {
    equals: dateType.eq,
    gt: dateType.gt,
    gte: dateType.geq,
    lt: dateType.ls,
    lte: dateType.leq,
    in: dateType.in,
  };
}