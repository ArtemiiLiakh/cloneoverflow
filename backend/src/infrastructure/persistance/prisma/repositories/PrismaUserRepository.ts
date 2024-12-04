import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserRepositoryInput } from '@core/domain/repositories/user/input/UserRepositoryInput';
import { UserRepositoryOutput } from '@core/domain/repositories/user/output/UserRepositoryOutput';
import { PrismaClient } from '@prisma/client';
import { UserOrderByAdapter } from '../adapters/orderBy/UserOrderByAdapter';
import { UserRepositoryMapper } from '../adapters/repositoryMappers/UserRepositoryMapper';
import { UserSelectAdapter } from '../adapters/select/UserSelectAdapter';
import { UserCredsWhereAdapter } from '../adapters/where/user/UserCredsWhereAdapter';
import { UserWhereAdapter } from '../adapters/where/user/UserWhereAdapter';
import { PrismaUserCredsType, PrismaUserType } from '../types/PrismaUserTypes';

export class PrismaUserRepository implements UserRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  findById ({ id, options }: UserRepositoryInput.FindById): Promise<UserRepositoryOutput.FindById> {
    return this.findOne({ where: { id }, options });
  }

  findByUsername ({ username, options }: UserRepositoryInput.FindByUsername): Promise<UserRepositoryOutput.FindByUsername> {
    return this.findOne({ where: { username: { eq: username } }, options });
  }

  async findByEmail ({ email, options }: UserRepositoryInput.FindByEmail): Promise<UserRepositoryOutput.FindByEmail> {
    const user = await this.prisma.user.findFirst({
      where: {
        userCreds: {
          email,
        },
      },
      select: UserSelectAdapter(options?.select, options?.include, options?.count),
    });

    if (!user) return null;

    return UserRepositoryMapper.findOne(user);
  }

  async findOne ({ where, options }: UserRepositoryInput.FindOne): Promise<UserRepositoryOutput.FindOne> {
    const user = await this.prisma.user.findFirst({
      where: UserWhereAdapter(where),
      select: UserSelectAdapter(options?.select, options?.include, options?.count),
      orderBy: UserOrderByAdapter(options?.orderBy),
    });

    if (!user) return null;

    return UserRepositoryMapper.findOne(user);
  }

  async findMany ({ where, options }: UserRepositoryInput.FindMany): Promise<UserRepositoryOutput.FindMany> {
    const users = await this.prisma.user.findMany({
      where: UserWhereAdapter(where),
      select: UserSelectAdapter(options?.select, options?.include, options?.count),
      orderBy: UserOrderByAdapter(options?.orderBy),
      skip: options?.offset,
      take: options?.take,
    }) as unknown as PrismaUserType[];

    return UserRepositoryMapper.findMany(users);
  }

  async findCreds ({ where }: UserRepositoryInput.FindCreds): Promise<UserRepositoryOutput.FindCreds> {
    const user = await this.prisma.userCreds.findFirst({ 
      where: UserCredsWhereAdapter(where),
    });
    
    if (!user) return null;
    
    return UserRepositoryMapper.findCreds(user);
  }

  async findWithCreds ({ where }: UserRepositoryInput.FindWithCreds): Promise<UserRepositoryOutput.FindWithCreds> {
    const user = await this.prisma.userCreds.findFirst({ 
      where: UserCredsWhereAdapter(where),
      include: {
        user: true,
      },
    });
    
    if (!user) return null;
    
    return UserRepositoryMapper.findWithCreds(user);
  }

  async count ({ where }: UserRepositoryInput.Count): Promise<UserRepositoryOutput.Count> {
    return this.prisma.user.count({
      where: UserWhereAdapter(where),
    });
  }

  async create ({ user }: UserRepositoryInput.Create): Promise<UserRepositoryOutput.Create> {
    await this.prisma.user.create({
      data: {
        userId: user.id,
        name: user.name,
        username: user.username,
        about: user.about,
        reputation: user.reputation,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }
  
  async createWithCreds ({ user, creds }: UserRepositoryInput.CreateWithCreds): Promise<UserRepositoryOutput.CreateWithCreds> {
    await this.prisma.userCreds.create({
      data: {
        id: creds.id,
        email: creds.email,
        password: creds.password,
        createdAt: creds.createdAt,
        updatedAt: creds.updatedAt,
        user: {
          create: {
            name: user.name,
            username: user.username,
            about: user.about,
            reputation: user.reputation,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
      },
    });
  }

  async update ({ id, user, returnEntity }: UserRepositoryInput.Update): Promise<UserRepositoryOutput.Update> {    
    const updatedUser = await this.prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        name: user.name,
        username: user.username,
        reputation: user.reputation,
        about: user.about,
        status: user.status,
        updatedAt: new Date(),
      },
    });
  
    if (returnEntity) {
      return UserRepositoryMapper.update(updatedUser);
    }
  }

  async updateCreds ({ id, creds, returnEntity }: UserRepositoryInput.UpdateCreds): Promise<UserRepositoryOutput.UpdateCreds> {
    const updatedCreds = await this.prisma.userCreds.update({ 
      where: { id }, 
      data: { 
        email: creds.email, 
        password: creds.password, 
      },
      include: {
        user: true,
      },
    }) as unknown as PrismaUserCredsType;

    if (returnEntity) {
      return UserRepositoryMapper.updateCreds(updatedCreds);
    }
  }

  async delete ({ user }: UserRepositoryInput.Delete): Promise<UserRepositoryOutput.Delete> {
    await this.prisma.userCreds.delete({ 
      where: { 
        id: user.id, 
      },
    });
  }
}