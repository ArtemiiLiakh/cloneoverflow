import config from '../config';
import { AuthLoginDTO } from '../dtos/auth.login.dto';
import { AuthSignInDTO } from '../dtos/auth.signin.dto';
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

    return this.getToken(user);
  }

  async signin ({ email, password, name, username, about }: AuthSignInDTO) {
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
          about,
        },
      },
    });

    return this.getToken(user);
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

  private getToken (user: DbUser) {
    const access_token = jwt.sign(
      {
        userId: user.id,
        name: user.userProfile?.name,
        username: user.userProfile?.username,
      }, 
      config.TOKEN_SECRET, 
      {
        expiresIn: "1h",
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