import config from '../config';
import { AuthLoginDTO } from '../dtos/auth.login.dto';
import { AuthSignupDTO } from '../dtos/auth.signup.dto';
import { UserRepository } from '../repositories/user.repository';
import { AlreadyRegisteredException } from '../utils/exceptions/AlreadyRegisteredException';
import { LoginException } from '../utils/exceptions/LoginExceptioin';
import { compare, hash } from '../utils/hash';
import jwt from 'jsonwebtoken';
import { DbUser } from '../types/database/DbUser';
import { UnauthorizedException } from '../utils/exceptions/UnauthorizedExceptioin';
import { ForbiddenException } from '../utils/exceptions/ForbiddenExceptioin';
import { AuthChangePasswordDTO } from '../dtos/auth.changePassword.dto';
import { WrongPasswordException } from '../utils/exceptions/WrongPasswordExceptioin';
import { BadBodyException } from '../utils/exceptions/BadBodyException';

export class AuthService {
  constructor (
    private userRepository = new UserRepository(),
  ) {}

  async login ({ email, password }: AuthLoginDTO) {
    const user = await this.userRepository.find({
      email,
    });

    if (!(user && await compare(password, user.password))) {
      throw new LoginException();
    }

    return {
      user,
      ...this.getToken(user),
    };
  }

  async signup ({ email, password, name, username }: AuthSignupDTO) {
    const userExists = await this.userRepository.find({
      OR: [
        { email },
        { userProfile: { username } },
      ],
    });

    if (userExists) {
      if (userExists.userProfile?.username === username) {
        throw new BadBodyException("Username already exists");
      }
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

  async changePassword (userId: string, { oldPassword, newPassword }: AuthChangePasswordDTO) {
    const user = await this.userRepository.findById(userId);
    
    if (!(user && await compare(oldPassword, user.password))) {
      throw new WrongPasswordException();
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
}