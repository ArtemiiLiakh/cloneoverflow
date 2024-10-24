import { NumberType } from "@common/repository/Datatypes/NumberType";
import { Prisma } from "@prisma/client";

export const NumberWhereAdapter = (numberType: undefined | null | number | NumberType): undefined | number | Prisma.IntFilter => {
  if (!numberType) return;
  if (typeof numberType === 'number') return numberType;
  return {
    equals: numberType.eq,
    gt: numberType.gt,
    gte: numberType.geq,
    lt: numberType.ls,
    lte: numberType.leq,
    in: numberType.in,
  };
}