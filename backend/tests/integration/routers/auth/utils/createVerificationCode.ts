import { VerificationCodePayload } from '@application/auth/data';
import { CacheRepository } from '@application/cache/CacheRepository';
import { SendVerificationCodeBody } from '@cloneoverflow/common/api/auth';
import { DataHasher } from '@common/encryption/DataHasher';
import { UserRepository } from '@core/user/repository/UserRepository';
import { INestApplication } from '@nestjs/common';
import { DataHasherDIToken } from '@web/di/tokens/encryption';
import { PrismaRepositoryDITokens, RedisRepositoryDITokens } from '@web/di/tokens/persistence';
import { randomBytes } from 'crypto';

export const createVerificationCode = async (
  nest: INestApplication,
  { email, codeType }: SendVerificationCodeBody,
  retries: number = 1,
): Promise<string> => {
  const userRepository: UserRepository = nest.get(PrismaRepositoryDITokens.UserRepository);
  const cacheRepostiory: CacheRepository = nest.get(RedisRepositoryDITokens.CacheRepository);
  const dataHasher: DataHasher = nest.get(DataHasherDIToken);

  const user = await userRepository.getByEmail({ email });
  const code = randomBytes(4).toString('base64');

  await cacheRepostiory.setObject<VerificationCodePayload>(
    `user:${codeType}:${user.userId}`,
    {
      code: await dataHasher.hash(code),
      retries,
    },
  );

  return code;
};