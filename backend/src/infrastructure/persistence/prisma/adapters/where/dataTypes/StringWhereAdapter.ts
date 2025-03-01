import { StringType } from '@common/repository/Datatypes/StringType';
import { Prisma } from '@prisma/client';

export const StringWhereAdapter = (strType?: StringType): undefined | string | Prisma.StringFilter => {
  if (!strType) return;
  
  if (Array.isArray(strType)) return {
    in: strType,
  };

  if (typeof strType === 'string') return strType;
  
  return {
    equals: strType.eq,
    contains: strType.contains,
    in: strType.in,
    mode: strType.ignoreCase ? 'insensitive' : 'default',
  };
};