import { Prisma, PrismaClient } from '@prisma/client';
import { DbUser } from '../utils/types/DbUser';

export class UserRepository {
  private include: Prisma.UserInclude = {
    userProfile: true,
  }

  constructor(private prisma = new PrismaClient()) {}

  create (data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({
      data,
      include: this.include,
    });
  }

  find<R=DbUser> (where: Prisma.UserWhereInput, args?: Prisma.UserFindFirstArgs) {
    return this.prisma.user.findFirst({
      where,
      include: this.include,
      ...args,
    }) as unknown as Promise<R>;
  }

  findMany<R=DbUser> (where: Prisma.UserWhereInput, args: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany({
      where,
      include: this.include,
      ...args,
    }) as unknown as Promise<R>;
  }
  
  update (where: Prisma.UserWhereUniqueInput, data: Prisma.UserUncheckedUpdateInput){
    return this.prisma.user.update({
      where,
      data,
      include: this.include,
    });
  }


  delete (where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
      include: this.include,
    });
  }
}