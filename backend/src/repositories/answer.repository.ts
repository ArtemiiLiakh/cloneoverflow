import { Prisma, PrismaClient, PrismaPromise, UserAnswerStatus } from "@prisma/client";
import { DbAnswer } from "../types/database/DbAnswer";

export class AnswerRepository {
  private include: Prisma.AnswerInclude = {
    userAnswers: {
      where: {
        status: UserAnswerStatus.OWNER,
      },
      include: {
        userProfile: true,
      },
    },
  }

  constructor(private prisma = new PrismaClient()) {}

  create<R=DbAnswer> (data: Prisma.AnswerUncheckedCreateInput) {
    return this.prisma.answer.create({
      data,
      include: this.include,
    }) as unknown as PrismaPromise<R>;
  }

  find<R=DbAnswer> (where: Prisma.AnswerWhereInput, args?: Prisma.AnswerFindFirstArgs) {
    return this.prisma.answer.findFirst({
      where,
      include: this.include,
      ...args,
    }) as unknown as PrismaPromise<R>;
  }

  findById<R=DbAnswer> (id, args?: Prisma.AnswerFindFirstArgs) {
    return this.prisma.answer.findFirst({
      where: { id },
      include: this.include,
      ...args,
    }) as unknown as PrismaPromise<R>;
  }

  findMany<R=DbAnswer[]> (where: Prisma.AnswerWhereInput, args?: Prisma.AnswerFindManyArgs) {
    return this.prisma.answer.findMany({
      where,
      include: this.include,
      ...args,
    }) as unknown as PrismaPromise<R>;
  }

  update<R=DbAnswer> (where: Prisma.AnswerWhereUniqueInput, data: Prisma.AnswerUncheckedUpdateInput) {
    return this.prisma.answer.update({
      where,
      data,
      include: this.include,
    }) as unknown as PrismaPromise<R>;
  }

  updateById<R=DbAnswer> (id: string, data: Prisma.AnswerUncheckedUpdateInput) {
    return this.prisma.answer.update({
      where: { id },
      data,
      include: this.include,
    }) as unknown as PrismaPromise<R>;
  }

  delete (where: Prisma.AnswerWhereUniqueInput) {
    return this.prisma.answer.delete({
      where,
      include: this.include,
    });
  }
  
  count (where: Prisma.AnswerWhereInput) {
    return this.prisma.answer.count({ where });
  }
}