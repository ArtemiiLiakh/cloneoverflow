import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserRepositoryInput } from '@core/domain/repositories/user/dtos/UserRepositoryInput';
import { UserRepositoryOutput } from '@core/domain/repositories/user/dtos/UserRepositoryOutput';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserCountsAdapter } from '../adapters/counts/UserCountsAdapter';
import { UserMapper } from '../adapters/entityMappers/UserMapper';
import { UserOrderByAdapter } from '../adapters/orderBy/UserOrderByAdapter';
import { UserWhereAdapter } from '../adapters/where/user/UserWhereAdapter';
import { PrismaPaginationRepository } from './PrismaPagination';
import { UserIncludeAdapter } from '../adapters/include/UserIncludeAdapter';
import { QuestionMapper } from '../adapters/entityMappers/QuestionMapper';
import { AnswerMapper } from '../adapters/entityMappers/AnswerMapper';
import { UserSelectAdapter } from '../adapters/select/UserSelectAdapter';
import { UserCredsMapper } from '../adapters/entityMappers/UserCredsMapper';

export class PrismaUserRepository implements UserRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async isExist ({ userId }: UserRepositoryInput.IsExist): Promise<UserRepositoryOutput.IsExist> {
    const user = await this.prisma.user.findFirst({ 
      where: { userId },
      select: { userId: true }, 
    });

    return !!user;
  }

  async getById (
    { userId }: UserRepositoryInput.GetById,
  ): Promise<UserRepositoryOutput.GetById> {
    const user = await this.prisma.user.findFirst({ where: { userId } });

    if (!user) return null;

    return UserMapper.toEntity(user);
  }

  async getByUsername (
    { username }: UserRepositoryInput.GetByUsername,
  ): Promise<UserRepositoryOutput.GetByUsername> {
    const user = await this.prisma.user.findFirst({ where: { username } });

    if (!user) return null;

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
        ...UserCountsAdapter(counts),
      },
    });

    if (!user) return null;

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
        ...UserCountsAdapter(counts),
        ...UserIncludeAdapter(include),
      },
    });

    if (!user) return null;

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
          ...UserCountsAdapter(counts),
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
        id: where.userId,
        email: where.email,
      },
      include: {
        user: withUser,
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
        id: creds.id,
        email: creds.email,
        password: creds.password,
        user: {
          create: {
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
      where: { id: userId },
      data: {
        email: creds.email,
        password: creds.password,
      },
    });
  }

  async delete (
    { userId }: UserRepositoryInput.Delete,
  ): Promise<UserRepositoryOutput.Delete> {
    await this.prisma.userCreds.delete({ where: { id: userId } });
  }
}