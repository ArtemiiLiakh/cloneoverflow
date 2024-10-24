import { QuestionUserRepositoryInput } from "@core/domain/repositories/question/input/QuestionUserRepositoryInput";
import { QuestionUserRepositoryOutput } from "@core/domain/repositories/question/output/QuestionUserRepositoryOutput";
import { QuestionUserRepository } from "@core/domain/repositories/question/QuestionUserRepository";
import { PrismaClient, UserQuestionStatus } from "@prisma/client";
import { QuestionUserStatsMapper } from "../adapters/entityMappers/QuestionUserMapper";

export class PrismaQuestionUserRepository implements QuestionUserRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}
  
  async create({ user }: QuestionUserRepositoryInput.Create): Promise<QuestionUserRepositoryOutput.Create> {
    await this.prisma.userQuestions.create({
      data: {
        id: user.id,
        questionId: user.questionId,
        userId: user.userId,
        status: user.status as UserQuestionStatus,
        voteType: user.voteType,
      },
    });
  }

  async findOne({ where }: QuestionUserRepositoryInput.FindOne): Promise<QuestionUserRepositoryOutput.FindOne> {
    const questionUser = await this.prisma.userQuestions.findFirst({
      where: {
        id: where.id,
        questionId: where.questionId,
        userId: where.userId,
        status: where.status as UserQuestionStatus,
        voteType: where.voteType,
      },
    });

    if (!questionUser) return null;

    return QuestionUserStatsMapper.toEntity(questionUser);
  }

  async update({ where, data }: QuestionUserRepositoryInput.Update): Promise<QuestionUserRepositoryOutput.Update> {
    const questionUser = await this.prisma.userQuestions.update({
      where: {
        id: where.id,
        userId: where.userId,
        questionId: where.questionId,
        status: where.status as UserQuestionStatus,
        voteType: where.voteType,
      },
      data: {
        status: data.status,
        voteType: data.voteType,
      },
    });

    return QuestionUserStatsMapper.toEntity(questionUser);
  }

  async delete({ questionUser }: QuestionUserRepositoryInput.Delete): Promise<QuestionUserRepositoryOutput.Delete> {
    await this.prisma.userQuestions.delete({
      where: {
        id: questionUser.id,
      }
    });
  }
}