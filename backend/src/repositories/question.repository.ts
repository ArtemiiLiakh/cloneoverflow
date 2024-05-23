import { Prisma, PrismaClient, PrismaPromise, UserAnswerStatus, UserQuestionStatus } from "@prisma/client";
import { DbQuestion } from "../types/database/DbQuestion";

export class QuestionRepository {
  private include: Prisma.QuestionInclude = {
    userQuestions: {
      where: {
        status: UserQuestionStatus.OWNER,
      },
      include: {
        userProfile: true,
      },
    },
    tags: true,
    answers: {
      include: {
        userAnswers: {
          where: {
            status: UserAnswerStatus.OWNER,
          },
          include: {
            userProfile: true,
          },
        },
      },
    },
  }

  constructor(private prisma = new PrismaClient()) {}

  create (data: Prisma.QuestionUncheckedCreateInput) {
    return this.prisma.question.create({
      data,
      include: this.include,
    }) as unknown as PrismaPromise<DbQuestion>;
  }

  find<R=DbQuestion> (where: Prisma.QuestionWhereInput, args?: Prisma.QuestionFindFirstArgs) {
    return this.prisma.question.findFirst({
      where,
      include: this.include,
      ...args,
    }) as unknown as PrismaPromise<R>;
  }

  findById<R=DbQuestion> (id: string, args?: Prisma.QuestionFindFirstArgs) {
    return this.find<R>({
      id,
    }, args);
  }

  findMany<R=DbQuestion> (where: Prisma.QuestionWhereInput, args?: Prisma.QuestionFindManyArgs) {
    return this.prisma.question.findMany({
      where,
      include: this.include,
      ...args,
    }) as unknown as PrismaPromise<R[]>;
  }

  update<R=DbQuestion> (where: Prisma.QuestionWhereUniqueInput, data: Prisma.QuestionUncheckedUpdateInput) {
    return this.prisma.question.update({
      where,
      data,
      include: this.include,
    }) as unknown as PrismaPromise<R>;
  }

  updateById (id: string, data: Prisma.QuestionUncheckedUpdateInput) {
    return this.update({
      id,
    }, data);
  }

  delete (where: Prisma.QuestionWhereUniqueInput) {
    return this.prisma.question.delete({
      where,
      include: this.include,
    }) as unknown as PrismaPromise<DbQuestion>;
  }

  count (where: Prisma.QuestionWhereInput) {
    return this.prisma.question.count({
      where,
    })
  }
}