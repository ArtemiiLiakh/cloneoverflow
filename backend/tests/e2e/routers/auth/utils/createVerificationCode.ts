import { DataHasherDIToken } from '@application/http-rest/nestjs/di/tokens/encryption';
import { PrismaRepositoryDITokens, RedisRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { VerificationCodePayload } from '@application/services/auth/data';
import { AuthVerificationCodeDTO } from '@cloneoverflow/common';
import { DataHasher } from '@common/encryption/DataHasher';
import { CacheRepository, UserRepository } from '@core/repositories';
import { INestApplication } from '@nestjs/common';
import { randomBytes } from 'crypto';

export const createVerificationCode = async (
  nest: INestApplication,
  { email, codeType }: AuthVerificationCodeDTO,
  retries: number = 1,
) => {
  const userRepository: UserRepository = nest.get(PrismaRepositoryDITokens.UserRepository);
  const cacheRepostiory: CacheRepository = nest.get(RedisRepositoryDITokens.CacheRepository);
  const dataHasher: DataHasher = nest.get(DataHasherDIToken);

  const user = await userRepository.getPartialUser({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  const code = randomBytes(4).toString('base64');

  await cacheRepostiory.setObject<VerificationCodePayload>(
    `user:${codeType}:${user.entity.id}`,
    {
      code: await dataHasher.hash(code),
      retries,
    },
  );

  return code;
};