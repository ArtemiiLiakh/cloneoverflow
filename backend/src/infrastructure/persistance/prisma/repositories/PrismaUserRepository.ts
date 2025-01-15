import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserRepositoryInput } from '@core/domain/repositories/user/dtos/UserRepositoryInput';
import { UserRepositoryOutput } from '@core/domain/repositories/user/dtos/UserRepositoryOutput';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserCountsAdapter } from '../adapters/counts/UserCountsAdapter';
import { UserMapper } from '../adapters/entityMappers/UserMapper';
import { UserOrderByAdapter } from '../adapters/orderBy/UserOrderByAdapter';
import { UserWhereAdapter } from '../adapters/where/user/UserWhereAdapter';
import { PrismaPaginationRepository } from './PrismaPaginationRepository';
import { UserIncludeAdapter } from '../adapters/include/UserIncludeAdapter';
import { QuestionMapper } from '../adapters/entityMappers/QuestionMapper';
import { AnswerMapper } from '../adapters/entityMappers/AnswerMapper';
import { UserSelectAdapter } from '../adapters/select/UserSelectAdapter';
import { UserCredsMapper } from '../adapters/entityMappers/UserCredsMapper';
import { NoEntityWithIdException } from '@cloneoverflow/common';

export class PrismaUserRepository implements UserRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async isExist (where: UserRepositoryInput.IsExist): Promise<UserRepositoryOutput.IsExist> {
    const user = await this.prisma.user.findFirst({ 
      where: UserWhereAdapter(where),
      select: { userId: true }, 
    });

    return !!user;
  }

  async validateById (
    { userId }: UserRepositoryInput.ValidateById,
  ): Promise<UserRepositoryOutput.ValidateById> {
    if (!await this.prisma.user.findFirst({ 
      where: { userId },
      select: { pk_id: true },
    })) {
      throw new NoEntityWithIdException('User');
    }
  }

  async getById (
    { userId }: UserRepositoryInput.GetById,
  ): Promise<UserRepositoryOutput.GetById> {
    const user = await this.prisma.user.findFirst({ where: { userId } });

    if (!user) throw new NoEntityWithIdException('User');

    return UserMapper.toEntity(user);
  }

  async getByEmail (
    { email }: UserRepositoryInput.GetByEmail,
  ): Promise<UserRepositoryOutput.GetByEmail> {
    const user = await this.prisma.user.findFirst({ 
      where: {
        userCreds: { email },
      },
    });

    if (!user) return null;

    return UserMapper.toEntity(user);
  }

  async getUser ({
    where,
    counts,
    include,
  }: UserRepositoryInput.GetUser): Promise<UserRepositoryOutput.GetUser> {
    const user = await this.prisma.user.findFirst({
      where: UserWhereAdapter(where),
      include: {
        ...UserIncludeAdapter(include),
        ...UserCountsAdapter(counts, where),
      },
    });

    if (!user) throw new NoEntityWithIdException('User');

    return {
      entity: UserMapper.toEntity(user),
      questions: user.questions?.map(QuestionMapper.toEntity),
      answers: user.answers?.map(AnswerMapper.toEntity),
      counts: user._count ? {
        questions: user._count.questions,
        answers: user._count.answers,
      } : undefined,
    };
  }

  async getPartialById (
    { userId, select }: UserRepositoryInput.GetPartialById,
  ): Promise<UserRepositoryOutput.GetPartialById> {
    const user = await this.prisma.user.findFirst({
      where: { userId },
      select: UserSelectAdapter(select),
    });

    if (!user) throw new NoEntityWithIdException('User');

    return UserMapper.toEntity(user);
  }

  async getPartialUser ({
    where,
    select,
    counts,
    include,
  }: UserRepositoryInput.GetPartialUser): Promise<UserRepositoryOutput.GetPartialUser> {
    const user = await this.prisma.user.findFirst({
      where: UserWhereAdapter(where),
      select: {
        ...UserSelectAdapter(select),
        ...UserCountsAdapter(counts, where),
        ...UserIncludeAdapter(include),
      },
    });

    if (!user) throw new NoEntityWithIdException('User');

    return {
      entity: UserMapper.toEntity(user),
      questions: user.questions?.map(QuestionMapper.toEntity),
      answers: user.answers?.map(AnswerMapper.toEntity),
      counts: user?._count ? {
        questions: user._count.questions,
        answers: user._count.answers,
      } : undefined,
    };
  }

  async getMany ({ 
    where, 
    select, 
    orderBy, 
    counts, 
    include,
    pagination,
  }: UserRepositoryInput.GetMany): Promise<UserRepositoryOutput.GetMany> {
    const users = await PrismaPaginationRepository.paginate(
      this.prisma.user.findMany.bind(this.prisma),
      this.prisma.user.count.bind(this.prisma),
      {
        where: UserWhereAdapter(where),
        select: {
          ...UserSelectAdapter(select),
          ...UserIncludeAdapter(include),
          ...UserCountsAdapter(counts, where),
        } as Prisma.UserSelect,
        orderBy: UserOrderByAdapter(orderBy),
      },
      pagination,
    );

    return {
      data: users.data.map((user) => ({
        user: UserMapper.toEntity(user),
        questions: user.questions?.map(QuestionMapper.toEntity),
        answers: user.answers?.map(AnswerMapper.toEntity),
        counts: user?._count ? {
          questions: user._count?.questions ?? 0,
          answers: user._count?.answers ?? 0,
        } : undefined,
      })),
      pagination: users.pagination,
    };
  }

  async getCreds (
    { where, withUser }: UserRepositoryInput.GetCreds,
  ): Promise<UserRepositoryOutput.GetCreds> {
    const creds = await this.prisma.userCreds.findFirst({
      where: {
        userId: where.userId,
        email: where.email,
      },
      include: {
        user: withUser ? {
          select: {
            userId: true,
            name: true,
            username: true,
            reputation: true,
            status: true,
            createdAt: true,
          },
        } : false,
      },
    });

    if (!creds) return null;

    return {
      creds: UserCredsMapper.toEntity(creds),
      user: creds?.user ? UserMapper.toEntity(creds.user) : undefined,
    };
  }

  async createWithCreds (
    { user, creds }: UserRepositoryInput.CreateWithCreds,
  ): Promise<UserRepositoryOutput.CreateWithCreds> {
    await this.prisma.userCreds.create({
      data: {
        userId: creds.id,
        email: creds.email,
        password: creds.password,
        user: {
          create: {
            userId: user.id,
            name: user.name,
            username: user.username,
            about: user.about,
            reputation: user.rating,
            status: user.status,
          },
        },
      },
    });
  }

  async update (
    { userId, user, returnEntity }: UserRepositoryInput.Update,
  ): Promise<UserRepositoryOutput.Update> {
    const updatedUser = await this.prisma.user.update({
      where: { userId },
      data: {
        name: user.name,
        username: user.username,
        about: user.about,
      },
    });

    if (returnEntity) return UserMapper.toEntity(updatedUser);
  }

  async updateCreds (
    { userId, creds }: UserRepositoryInput.UpdateCreds,
  ): Promise<UserRepositoryOutput.UpdateCreds> {
    await this.prisma.userCreds.update({
      where: { userId },
      data: {
        email: creds.email,
        password: creds.password,
      },
    });
  }

  async delete (
    { userId }: UserRepositoryInput.Delete,
  ): Promise<UserRepositoryOutput.Delete> {
    await this.prisma.userCreds.delete({ where: { userId } });
  }
}