import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { RedisCacheRepositoryDI } from '@application/di/repositories/RedisCacheRepositoryDI';
import { DataHasherDI } from '@application/di/security/hashers/DataHasherDI';
import { VerificationCodePayload } from '@application/services/auth/data';
import { AuthVerificationCodeDTO } from '@cloneoverflow/common';
import { randomBytes } from 'crypto';

export const createVerificationCode = async (
  { email, codeType }: AuthVerificationCodeDTO,
  retries: number = 1,
) => {
  const user = await PrismaUserRepositoryDI.getPartialUser({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  const code = randomBytes(4).toString('base64');

  await RedisCacheRepositoryDI.setObject<VerificationCodePayload>(
    `user:${codeType}:${user.entity.id}`,
    {
      code: await DataHasherDI.hash(code),
      retries,
    },
  );

  return code;
};