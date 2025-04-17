import { NoEntityWithIdException, NotFoundException, UserStatusEnum } from '@cloneoverflow/common';
import { UserRepository } from '@core/repositories';
import { UserRepoCreateInput, UserRepoCreateOutput } from '@core/repositories/user/dtos/Create';
import { UserRepoDecreaseRatingInput, UserRepoDecreaseRatingOutput } from '@core/repositories/user/dtos/DecreaseRating';
import { UserRepoDeleteInput, UserRepoDeleteOutput } from '@core/repositories/user/dtos/Delete';
import { UserRepoGetByEmailInput, UserRepoGetByEmailOutput } from '@core/repositories/user/dtos/GetByEmail';
import { UserRepoGetByIdInput, UserRepoGetByIdOutput } from '@core/repositories/user/dtos/GetById';
import { UserRepoGetByUsernameInput, UserRepoGetByUsernameOutput } from '@core/repositories/user/dtos/GetByUsername';
import { UserRepoGetCredsInput, UserRepoGetCredsOutput } from '@core/repositories/user/dtos/GetCreds';
import { UserRepoGetProfileByIdInput, UserRepoGetProfileByIdOutput } from '@core/repositories/user/dtos/GetProfileById';
import { UserRepoincreaseRatingInput, UserRepoIncreaseRatingOutput } from '@core/repositories/user/dtos/IncreaseRating';
import { UserRepoUpdateInput, UserRepoUpdateOutput } from '@core/repositories/user/dtos/Update';
import { UserRepoUpdateCredsInput, UserRepoUpdateCredsOutput } from '@core/repositories/user/dtos/UpdateCreds';
import { UserRepoIsExistInput, UserRepoIsExistOutput } from '@core/repositories/user/dtos/isExist';
import { PrismaClient } from '@prisma/client';
import { UserCredsMapper } from '../adapters/entityMappers/UserCredsMapper';
import { UserMapper } from '../adapters/entityMappers/UserMapper';
import { UserProfileMapper } from '../adapters/entityMappers/UserProfileMapper';
import { UserSelectAdapter } from '../adapters/select/UserSelectAdapter';

export class PrismaUserRepository implements UserRepository {
  constructor (
    private client: PrismaClient,
  ) {}
  
  async getByEmail ({ email, select }: UserRepoGetByEmailInput): Promise<UserRepoGetByEmailOutput> {
    const user = await this.client.user.findFirst({
      where: {
        userCreds: {
          email,
        },
      },
      select: UserSelectAdapter(select),
    });

    if (!user) {
      throw new NotFoundException('User with this email is not found');
    }

    return UserMapper.toEntity(user);
  }

  async getById (
    { userId, select }: UserRepoGetByIdInput,
  ): Promise<UserRepoGetByIdOutput> {
    const user = await this.client.user.findFirst({
      where: {
        id: userId,
      },
      select: UserSelectAdapter(select),
    });

    if (!user) {
      throw new NoEntityWithIdException('User');
    }

    return UserMapper.toEntity(user);
  }

  async getByUsername (
    { username, select }: UserRepoGetByUsernameInput,
  ): Promise<UserRepoGetByUsernameOutput> {
    const user = await this.client.user.findFirst({
      where: {
        username,
      },
      select: UserSelectAdapter(select),
    });

    if (!user) {
      throw new NotFoundException('User with this username is not found');
    }

    return UserMapper.toEntity(user);  
  }

  async getCreds (
    { userId, email }: UserRepoGetCredsInput,
  ): Promise<UserRepoGetCredsOutput> {
    const creds = await this.client.userCreds.findFirst({
      where: {
        id: userId,
        email,
      },
    });

    if (!creds) {
      throw new NotFoundException(`User creds with this ${userId ? 'id' : 'email'} is not found`);
    }

    return UserCredsMapper.toEntity(creds);   
  }

  async getProfile (
    { userId }: UserRepoGetProfileByIdInput,
  ): Promise<UserRepoGetProfileByIdOutput> {
    const user = await this.client.user.findFirst({
      where: { id: userId },
      include: {
        _count: {
          select: {
            questions: true,
            answers: true,
          },
        },
        userCreds: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!user) {
      throw new NoEntityWithIdException('User');
    }

    return UserProfileMapper.toEntity(user, {
      email: user.userCreds.email,
      answerAmount: user._count.questions,
      questionAmount: user._count.answers,
    });
  }

  async isExist (
    { userId, email, username }: UserRepoIsExistInput,
  ): Promise<UserRepoIsExistOutput> {
    if (!userId && !email && !username) {
      throw new Error('User id or email or username must be provided');
    }

    const res = await this.client.user.findFirst({
      where: {
        id: userId,
        username,
        userCreds: {
          email,
        },
      },
      select: {
        id: true,
      },
    });

    return !!res;
  }

  async create (
    { creds, user }: UserRepoCreateInput,
  ): Promise<UserRepoCreateOutput> {
    const newUser = await this.client.user.create({
      data: {
        name: user.name,
        username: user.username,
        about: user.about,
        rating: 0,
        status: UserStatusEnum.USER,
        userCreds: {
          create: {
            email: creds.email,
            password: creds.password,
          },
        },
      },
    });

    return UserMapper.toEntity(newUser);
  }

  async update (
    { userId, data }: UserRepoUpdateInput,
  ): Promise<UserRepoUpdateOutput> {
    const user = await this.client.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        username: data.username,
        about: data.about,
      },
    });

    return UserMapper.toEntity(user);
  }

  async delete (
    { userId }: UserRepoDeleteInput,
  ): Promise<UserRepoDeleteOutput> {
    await this.client.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async updateCreds (
    { userId, data }: UserRepoUpdateCredsInput,
  ): Promise<UserRepoUpdateCredsOutput> {
    await this.client.userCreds.update({
      where: {
        id: userId,
      },
      data: {
        email: data.email,
        password: data.password,
      },
    });
  }

  async increaseRating (
    { userId }: UserRepoincreaseRatingInput,
  ): Promise<UserRepoIncreaseRatingOutput> {
    await this.client.user.update({
      where: {
        id: userId,
      },
      data: {
        rating: {
          increment: 1,
        },
      },
    });
  }

  async decreaseRating (
    { userId }: UserRepoDecreaseRatingInput,
  ): Promise<UserRepoDecreaseRatingOutput> {
    await this.client.user.update({
      where: {
        id: userId,
      },
      data: {
        rating: {
          decrement: 1,
        },
      },
    });
  }
}