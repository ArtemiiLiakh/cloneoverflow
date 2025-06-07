import { makeAccessToken } from '@application/auth/utils/makeAccessToken';
import { makeRefreshToken } from '@application/auth/utils/makeRequestToken';
import { EncryptOptions } from '@common/encryption/DataEncryptor';
import { DataHasher } from '@common/encryption/DataHasher';
import { AuthTokens } from '@common/types/AuthTokens';
import { UserRepository } from '@core/user/repository/UserRepository';
import { User } from '@core/user/User';
import { JwtEncryptorImpl } from '@infrastructure/encryption/JwtEncryptorImpl';
import { UserMapper } from '@infrastructure/persistence/prisma/adapters/entityMappers/UserMapper';
import { INestApplication } from '@nestjs/common';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { DatabaseDITokens } from '@web/di/tokens/DatabaseDITokens';
import { DataHasherDIToken } from '@web/di/tokens/encryption';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { randomBytes } from 'crypto';

export class UserUtils {
  private dataHasher: DataHasher;
  private userRepository: UserRepository;
  private prisma: PrismaClient;

  constructor (
    nest: INestApplication,
  ) {
    this.prisma = nest.get(DatabaseDITokens.PrismaClient);
    this.userRepository = nest.get(PrismaRepositoryDITokens.UserRepository);
    this.dataHasher = nest.get(DataHasherDIToken);
  }

  async create (user?: Partial<PrismaUser> & { email?: string, password?: string }): Promise<User> {
    const userCreds = await this.prisma.userCreds.create({
      data: {
        email: user?.email ?? randomBytes(4).toString('hex')+'@gmail.com',
        password: await this.dataHasher.hash(user?.password ?? 'q12345678'),
        user: {
          create: {
            username: user?.username ?? randomBytes(4).toString('hex'),
            name: 'name',
            about: 'about',
            rating: user?.rating,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return UserMapper.toEntity(userCreds.user!);
  }

  getUser (userId: string): Promise<User | undefined> {
    return this.userRepository.getById({ userId }).catch(() => undefined);
  }

  async getTokens (user: User, options?: EncryptOptions): Promise<AuthTokens> {
    const accessToken = await makeAccessToken(
      new JwtEncryptorImpl(), 
      {
        userId: user.userId,
        status: user.status,
      }, 
      options,
    );

    const refreshToken = await makeRefreshToken(
      new JwtEncryptorImpl(), 
      {
        userId: user.userId,
        status: user.status,
      }, 
      options,
    );
    
    return {
      accessToken: 'accessToken='+accessToken,
      refreshToken: 'refreshToken='+refreshToken,
    };
  }

  async delete (userId: string): Promise<void> {
    await this.userRepository.delete({ userId });
  }
}