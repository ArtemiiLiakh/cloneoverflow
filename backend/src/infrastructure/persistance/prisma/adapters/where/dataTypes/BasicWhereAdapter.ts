import { BasicType } from '@common/repository/Datatypes/BasicType';
import { Prisma } from '@prisma/client';

export const BasicStringWhereAdapter = (basicType?: BasicType<string>): undefined | string | Prisma.StringFilter  => {
  if (!basicType) return;
  if (typeof basicType === 'string') return basicType;

  return {
    in: basicType,
  };
};