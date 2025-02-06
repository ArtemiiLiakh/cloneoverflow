import { makeAccessToken } from '@application/auth/utils/makeAccessToken';
import { makeRefreshToken } from '@application/auth/utils/makeRequestToken';
import { DataHasherDI } from '@application/di/security/hashers/DataHasherDI';
import { User } from '@core/domain/entities/User';
import { UserCreds } from '@core/domain/entities/UserCreds';
import { UserRepository } from '@core/domain/repositories';
import { JwtEncryptorImpl } from '@infrastructure/security/JwtEncryptorImpl';
import { randomUUID } from 'crypto';

export class UserUtils {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async create (user?: Partial<User> & { email?: string, password?: string }): Promise<User> {
    const creds = UserCreds.new({
      email: user?.email ?? randomUUID()+'@gmail.com',
      password: await DataHasherDI.hash(user?.password ?? 'q12345678'),
    });

    const newUser = User.new({
      id: creds.id,
      name: user?.name ?? 'name',
      username: user?.username ?? randomUUID(),
      rating: user?.rating,
      status: user?.status,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
      about: user?.about,
    });

    await this.userRepository.createWithCreds({ creds, user: newUser });
    return newUser;
  }

  getUser (userId: string): Promise<User> {
    return this.userRepository.getById({ userId });
  }

  async getTokens (user: User) {
    const accessToken = await makeAccessToken(new JwtEncryptorImpl(), {
      userId: user.id,
      status: user.status,
    });

    const refreshToken = await makeRefreshToken(new JwtEncryptorImpl(), {
      userId: user.id,
      status: user.status,
    });
    
    return {
      accessToken,
      refreshToken,
    };
  }

  async delete (userId: string): Promise<void> {
    await this.userRepository.delete({ userId });
  }
}