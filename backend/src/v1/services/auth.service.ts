import { forgotPasswordMessage } from '@/v1/data/email/forgotPasswordMessage';
import { GoogleService } from '@/v1/services/google/google.service';
import { UserRepository } from '@/v1/repositories/user.repository';
import { PasswordCodeData } from '@/v1/types/cache/PasswordCodeData';
import { CacheDatabase } from '@/v1/types/database/CacheDatabase';
import { DbUser } from '@/v1/types/database/DbUser';
import { compareHash, hash } from '@/v1/utils/hash';
import {
  AlreadyRegisteredException,
  AuthChangePasswordDTO,
  AuthForgotPasswordResolveDTO,
  AuthLoginDTO,
  AuthSignupDTO,
  BadBodyException,
  ForbiddenException,
  LoginException,
  RetriesExpiredException,
  UnauthorizedException,
} from '@cloneoverflow/common';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config';

export class AuthService {
  constructor (
    private googleService: GoogleService,
    private userRepository: UserRepository,
    private cacheDatabase: CacheDatabase,
  ) {}

  async login ({ email, password }: AuthLoginDTO) {
    const user = await this.userRepository.find({
      email,
    });

    if (!(user && await compareHash(password, user.password))) {
      throw new LoginException();
    }

    return {
      user,
      ...this.getToken(user),
    };
  }

  async signup ({ email, password, name, username, about }: AuthSignupDTO) {
    const userExists = await this.userRepository.find({
      OR: [
        { email },
        { userProfile: { username } },
      ],
    });

    if (userExists) {
      throw new AlreadyRegisteredException();
    }

    const passwordHash = await hash(password);

    const user = await this.userRepository.create({
      email,
      password: passwordHash,
      userProfile: {
        create: {
          name,
          username,
          about,
        },
      },
    });

    return {
      user,
      ...this.getToken(user),
    };
  }

  async refreshToken (refresh_token: string) {
    if (!refresh_token) {
      throw new UnauthorizedException();
    }

    try {
      const { userId } = jwt.verify(refresh_token, config.TOKEN_SECRET) as any;
      const user = await this.userRepository.findById(userId);
      return {
        access_token: this.getToken(user).access_token,
      };
    }
    catch (err) {
      throw new ForbiddenException();
    }
  }

  async changePassword (userId: string, { oldPassword, newPassword, email }: AuthChangePasswordDTO) {
    const user = await this.userRepository.findById(userId);
    
    if (!(user && user.email === email && await compareHash(oldPassword, user.password))) {
      throw new LoginException();
    }

    const passwordHash = await hash(newPassword);
    await this.userRepository.updateById(userId, {
      password: passwordHash,
    });
  }

  async getMe (userId: string) {
    return await this.userRepository.findById(userId);
  }

  private getToken (user: DbUser) {
    const access_token = jwt.sign(
      {
        userId: user.id,
        status: user.userProfile.status,
      }, 
      config.TOKEN_SECRET, 
      {
        expiresIn: "15m",
      },
    );

    const refresh_token = jwt.sign(
      {
        userId: user.id,
      }, 
      config.TOKEN_SECRET, 
      {
        expiresIn: "7d",
      },
    );

    return {
      access_token,
      refresh_token,
    }
  }

  async forgotPassword (email: string) {
    const user = await this.userRepository.find({
      email,
    });

    if (!user) {
      throw new BadBodyException('No user with this email');
    }

    const code = randomBytes(3).toString('hex');
    await this.googleService.email.sendEmail(email, forgotPasswordMessage(code));

    await this.cacheDatabase.setObject<PasswordCodeData>(`forgot:${user.id}`, {
      code: await hash(code),
      retries: 1,
    }, {
      expireAt: config.cache.CODE_EXPIRE_TIME,
    });
  }

  async forgotPasswordResolve ({ email, code, newPassword }: AuthForgotPasswordResolveDTO) {
    const user = await this.userRepository.find({
      email,
    });

    if (!user) {
      throw new BadBodyException('No user with this email');
    }

    const savedCode = await this.cacheDatabase.getObject<PasswordCodeData>(`forgot:${user.id}`);
    
    if (!savedCode) {
      throw new BadBodyException('User does not have code');
    }

    if (savedCode.retries >= config.cache.CODE_RETRIES) {
      await this.cacheDatabase.delete(`forgot:${user.id}`);

      throw new RetriesExpiredException();
    }
    
    if (!await compareHash(code, savedCode.code)) {
      await this.cacheDatabase.setObject<PasswordCodeData>(`forgot:${user.id}`, {
        code: savedCode.code,
        retries: savedCode.retries+1,
      });

      throw new BadBodyException('Code does not match');
    }

    await this.cacheDatabase.delete(`forgot:${user.id}`);

    await this.userRepository.updateById(user.id, {
      password: await hash(newPassword),
    });
  }
}