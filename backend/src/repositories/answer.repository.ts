import { Prisma, PrismaClient } from "@prisma/client";
import { DbAnswer } from "../types/database/DbAnswer";

export class AnswerRepository {
  private include: Prisma.AnswerInclude = {
    userProfile: true,
    question: true,
  }

  constructor(private prisma = new PrismaClient()) {}

  create (data: Prisma.AnswerUncheckedCreateInput) {
    return this.prisma.answer.create({
      data,
      include: this.include,
    });
  }

  find<R=DbAnswer> (where: Prisma.AnswerWhereInput, args?: Prisma.AnswerFindFirstArgs) {
    return this.prisma.answer.findFirst({
      where,
      include: this.include,
      ...args,
    }) as unknown as Promise<R>;
  }

  findMany<R=DbAnswer> (where: Prisma.AnswerWhereInput, args?: Prisma.AnswerFindManyArgs) {
    return this.prisma.answer.findMany({
      where,
      include: this.include,
      ...args,
    }) as unknown as Promise<R>;
  }

  update (where: Prisma.AnswerWhereUniqueInput, data: Prisma.AnswerUncheckedUpdateInput) {
    return this.prisma.answer.update({
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
  
  count (where: Prisma.AnswerWhereInput) {
    return this.prisma.answer.count({ where });
  }
}