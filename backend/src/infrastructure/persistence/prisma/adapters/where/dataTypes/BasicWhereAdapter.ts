import { BasicType } from '@common/repository/Datatypes/BasicType';
import { uuidToBytes } from '@infrastructure/persistence/prisma/utils/uuid';
import { Prisma } from '@prisma/client';

export const BasicStringWhereAdapter = (basicType?: BasicType<string>): undefined | string | Prisma.StringFilter  => {
  if (basicType === undefined) return;
  if (Array.isArray(basicType)) return { in: basicType };

  return basicType;
};

export const BasicNumberWhereAdapter = (basicType?: BasicType<number>): undefined | number | Prisma.IntFilter  => {
  if (basicType === undefined) return;
  if (Array.isArray(basicType)) return { in: basicType };

  return basicType;
};

export const BasicUUIDWhereAdapter = (basicType?: BasicType<string>): Prisma.BytesFilter | undefined => {
  if (basicType === undefined) return;
  if (Array.isArray(basicType)) return {
    in: basicType.map(uuidToBytes),
  };

  return { equals: uuidToBytes(basicType) };
};