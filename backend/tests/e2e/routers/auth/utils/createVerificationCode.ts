import { VerificationCodePayload } from '@application/auth/data/VerificationCodePayload';
import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { RedisCacheRepositoryDI } from '@application/di/repositories/RedisCacheRepositoryDI';
import { DataHasherDI } from '@application/di/security/hashers/DataHasherDI';
import { AuthVerificationCodeDTO } from '@cloneoverflow/common';

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

  const code = 'code';

  await RedisCacheRepositoryDI.setObject<VerificationCodePayload>(
    `user:${codeType}:${user.entity.id}`,
    {
      code: await DataHasherDI.hash(code),
      retries,
    },
  );

  return code;
};