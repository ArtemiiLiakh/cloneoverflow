import { AnswerUserRepository } from "@core/domain/repositories/answer/AnswerUserRepository";
import { AnswerUserRepositoryOutput } from "@core/domain/repositories/answer/output/AnswerUserRepositoryOutput";
import { AnswerUserRepositoryInput } from "@core/domain/repositories/answer/input/AnswerUserRepositoryInput";
import { PrismaClient, UserAnswerStatus } from "@prisma/client";
import { AnswerUserStatsMapper } from "../adapters/entityMappers/AnswerUserMapper";

export class PrismaAnswerUserRepository implements AnswerUserRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async findOne({ where }: AnswerUserRepositoryInput.FindOne): Promise<AnswerUserRepositoryOutput.FindOne> {
    const answerUser = await this.prisma.userAnswers.findFirst({
      where: {
        id: where.id,
        answerId: where.answerId,
        userId: where.userId,
        status: where.status as UserAnswerStatus,
        voteType: where.voteType,
      }
    });

    if (!answerUser) return null;

    return AnswerUserStatsMapper.toEntity(answerUser);
  }
  
  async create({ user }: AnswerUserRepositoryInput.Create): Promise<AnswerUserRepositoryOutput.Create> {
    await this.prisma.userAnswers.create({
      data: {
        id: user.id,
        userId: user.userId,
        answerId: user.answerId,
        status: user.status as UserAnswerStatus,
        voteType: user.voteType,
      }
    });
  }

  async update({ where, data }: AnswerUserRepositoryInput.Update): Promise<AnswerUserRepositoryOutput.Update> {
    const answerUser = await this.prisma.userAnswers.update({
      where: {
        id: where.id,
        answerId: where.answerId,
        userId: where.userId,
        status: where.status as UserAnswerStatus,
        voteType: where.voteType,
      },
      data: {
        status: data.status,
        voteType: data.voteType,
      }
    });

    return AnswerUserStatsMapper.toEntity(answerUser);
  }

  async delete({ answerUser }: AnswerUserRepositoryInput.Delete): Promise<AnswerUserRepositoryOutput.Delete> {
    await this.prisma.userAnswers.delete({
      where: {
        id: answerUser.id,
        answerId: answerUser.answerId,
        userId: answerUser.userId,
        status: answerUser.status as UserAnswerStatus,
        voteType: answerUser.voteType,
      }
    });
  }
}