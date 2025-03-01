import { DataHasherDIToken } from '@application/http-rest/nestjs/di/tokens/encryption';
import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { makeAccessToken } from '@application/services/auth/utils/makeAccessToken';
import { makeRefreshToken } from '@application/services/auth/utils/makeRequestToken';
import { EncryptOptions } from '@common/encryption/DataEncryptor';
import { DataHasher } from '@common/encryption/DataHasher';
import { User } from '@core/models/User';
import { UserCreds } from '@core/models/UserCreds';
import { UserRepository } from '@core/repositories';
import { JwtEncryptorImpl } from '@infrastructure/encryption/JwtEncryptorImpl';
import { INestApplication } from '@nestjs/common';
import { randomBytes } from 'crypto';

export class UserUtils {
  private dataHasher: DataHasher;
  private userRepository: UserRepository;

  constructor (
    nest: INestApplication,
  ) {
    this.userRepository = nest.get(PrismaRepositoryDITokens.UserRepository);
    this.dataHasher = nest.get(DataHasherDIToken);
  }

  async create (user?: Partial<User> & { email?: string, password?: string }): Promise<User> {
    const creds = UserCreds.new({
      email: user?.email ?? randomBytes(4).toString('hex')+'@gmail.com',
      password: await this.dataHasher.hash(user?.password ?? 'q12345678'),
    });

    const newUser = User.new({
      id: creds.id,
      name: user?.name ?? 'name',
      username: user?.username ?? randomBytes(4).toString('hex'),
      rating: user?.rating,
      status: user?.status,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
      about: user?.about,
    });

    await this.userRepository.createWithCreds({ creds, user: newUser });
    return newUser;
  }

  getUser (userId: string): Promise<User | undefined> {
    return this.userRepository.getById({ userId }).catch(() => undefined);
  }

  async getTokens (user: User, options?: EncryptOptions) {
    const accessToken = await makeAccessToken(
      new JwtEncryptorImpl(), 
      {
        userId: user.id,
        status: user.status,
      }, 
      options,
    );

    const refreshToken = await makeRefreshToken(
      new JwtEncryptorImpl(), 
      {
        userId: user.id,
        status: user.status,
      }, 
      options,
    );
    
    return {
      accessToken,
      refreshToken,
    };
  }

  async delete (userId: string): Promise<void> {
    await this.userRepository.delete({ userId });
  }
}