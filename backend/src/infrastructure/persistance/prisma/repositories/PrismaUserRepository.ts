import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { UserRepositoryOutput } from "@core/domain/repositories/user/output/UserRepositoryOutput";
import { UserRepositoryInput } from "@core/domain/repositories/user/input/UserRepositoryInput";
import { UserIncludeAdapter } from "@infra/persistance/prisma/adapters/include/UserIncludeAdapter";
import { UserOrderByAdapter } from "@infra/persistance/prisma/adapters/orderBy/UserOrderByAdapter";
import { UserRepositoryMapper } from "@infra/persistance/prisma/adapters/repositories/UserRepositoryMapper";
import { UserCredsWhereAdapter } from "@infra/persistance/prisma/adapters/where/user/UserCredsWhereAdapter";
import { UserWhereAdapter } from "@infra/persistance/prisma/adapters/where/user/UserWhereAdapter";
import { PrismaUserCredsType, PrismaUserType } from "@infra/persistance/prisma/types/PrismaUserTypes";
import { PrismaClient } from "@prisma/client";

export class PrismaUserRepository implements UserRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  findById({ id, options }: UserRepositoryInput.FindById): Promise<UserRepositoryOutput.FindById> {
    return this.findOne({ where: { id: { eq: id } }, options });
  }

  async findByUsername({ username, options }: UserRepositoryInput.FindByUsername): Promise<UserRepositoryOutput.FindByUsername> {
    return this.findOne({ where: { username: { eq: username } }, options });
  }

  async findOne({ where, options }: UserRepositoryInput.FindOne): Promise<UserRepositoryOutput.FindOne> {
    const user = await this.prisma.user.findFirst({
      where: UserWhereAdapter(where),
      include: UserIncludeAdapter(options?.include, options?.count),
      orderBy: UserOrderByAdapter(options?.orderBy),
    });

    if (!user) return null;

    return UserRepositoryMapper.findOne(user);
  }

  async findWithCreds({ where, options }: UserRepositoryInput.FindWithCreds): Promise<UserRepositoryOutput.FindWithCreds> {
    const user = await this.prisma.userCreds.findFirst({ 
      where: UserCredsWhereAdapter(where),
      include: {
        user: {
          include: UserIncludeAdapter(options?.include, options?.count),
        },
      }
    });
    
    if (!user) return null;
    
    return UserRepositoryMapper.findWithCreds(user);
  }

  async findMany({ where, options }: UserRepositoryInput.FindMany): Promise<UserRepositoryOutput.FindMany> {
    const users = await this.prisma.user.findMany({
      where: UserWhereAdapter(where),
      include: UserIncludeAdapter(options?.include, options?.count),
      orderBy: UserOrderByAdapter(options?.orderBy),
      skip: options?.offset,
      take: options?.take
    }) as unknown as PrismaUserType[];

    return UserRepositoryMapper.findMany(users);
  }

  async count({ where }: UserRepositoryInput.Count): Promise<UserRepositoryOutput.Count> {
    return this.prisma.user.count({
      where: UserWhereAdapter(where),
    });
  }

  async create({ user, creds }: UserRepositoryInput.Create): Promise<UserRepositoryOutput.Create> {
    const prismaUser = await this.prisma.userCreds.create({
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
          }
        }
      },
      include: {
        user: true,
      }
    });
  }

  async update({ id, user }: UserRepositoryInput.Update): Promise<UserRepositoryOutput.Update> {    
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
  
      return UserRepositoryMapper.update(updatedUser);
  }

  async updateCreds({ id, creds }: UserRepositoryInput.UpdateCreds): Promise<UserRepositoryOutput.UpdateCreds> {
    const updatedCreds = await this.prisma.userCreds.update({ 
      where: { id }, 
      data: { 
        email: creds.email, 
        password: creds.password 
      },
      include: {
        user: true,
      },
    }) as unknown as PrismaUserCredsType;

    return UserRepositoryMapper.updateCreds(updatedCreds);
  }

  async delete({ user }: UserRepositoryInput.Delete): Promise<UserRepositoryOutput.Delete> {
    await this.prisma.userCreds.delete({ 
      where: { 
        id: user.id, 
      },
    });
  }
}