import { NumberType } from '@common/repository/Datatypes/NumberType';
import { Prisma } from '@prisma/client';

export const NumberWhereAdapter = (numberType?: NumberType): undefined | number | Prisma.IntFilter => {
  if (!numberType) return;
  
  if (Array.isArray(numberType)) return {
    in: numberType,
  };

  if (typeof numberType === 'number') return numberType;
  
  return {
    equals: numberType.eq,
    gt: numberType.gt,
    gte: numberType.geq,
    lt: numberType.ls,
    lte: numberType.leq,
    in: numberType.in,
  };
};