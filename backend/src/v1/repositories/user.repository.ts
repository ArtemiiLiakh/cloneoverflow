import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { DbUser } from '@/v1/types/database/DbUser';

export class UserRepository {
  private include: Prisma.UserInclude = {
    userProfile: true,
  }

  constructor(private prisma: PrismaClient) {}

  create (data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({
      data,
      include: this.include,
    }) as unknown as PrismaPromise<DbUser>;
  }

  find<R=DbUser> (where: Prisma.UserWhereInput, args?: Prisma.UserFindFirstArgs) {
    return this.prisma.user.findFirst({
      where,
      include: this.include,
      ...args,
    }) as unknown as PrismaPromise<R>;
  }

  findById<R=DbUser> (id: string, args?: Prisma.UserFindFirstArgs) {
    return this.find<R>({
      id,
    }, args);
  }

  findMany<R=DbUser> (where: Prisma.UserWhereInput, args: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany({
      where,
      include: this.include,
      ...args,
    }) as unknown as PrismaPromise<R[]>;
  }
  
  update<R=DbUser> (where: Prisma.UserWhereUniqueInput, data: Prisma.UserUncheckedUpdateInput) {
    return this.prisma.user.update({
      where,
      data,
      include: this.include,
    }) as unknown as PrismaPromise<R>;
  }

  updateById (id: string, data: Prisma.UserUncheckedUpdateInput) {
    return this.update({
      id,
    }, data);
  }

  delete (where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
      include: this.include,
    }) as unknown as PrismaPromise<DbUser>;
  }
}