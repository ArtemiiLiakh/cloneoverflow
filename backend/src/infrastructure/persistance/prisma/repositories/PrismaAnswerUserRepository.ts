import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { AnswerUserRepositoryInput } from '@core/domain/repositories/answer/dtos/answerUser/AnswerUserRepositoryInput';
import { AnswerUserRepositoryOutput } from '@core/domain/repositories/answer/dtos/answerUser/AnswerUserRepositoryOutput';
import { PrismaClient } from '@prisma/client';
import { AnswerUserMapper } from '../adapters/entityMappers/AnswerUserMapper';
import { AnswerUserWhereAdapter } from '../adapters/where/answer/AnswerUserWhereAdapter';

export class PrismaAnswerUserRepository implements AnswerUserRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async getOne (
    { where }: AnswerUserRepositoryInput.GetOne,
  ): Promise<AnswerUserRepositoryOutput.GetOne> {
    const answerUser = await this.prisma.answerUser.findFirst({
      where: AnswerUserWhereAdapter(where),
    });

    if (!answerUser) return null;

    return AnswerUserMapper.toEntity(answerUser);    
  }

  async create ({ user }: AnswerUserRepositoryInput.Create): Promise<AnswerUserRepositoryOutput.Create> {
    await this.prisma.answerUser.create({
      data: {
        answerUserId: user.id,
        userId: user.userId,
        answerId: user.answerId,
        status: user.status,
        voteType: user.voteType,
        answer: {
          connect: { answerId: user.answerId },
        },
        user: {
          connect: { userId: user.userId },
        },
      },
    });
  }

  async update ({ answerUserId, data, returnEntity }: AnswerUserRepositoryInput.Update): Promise<AnswerUserRepositoryOutput.Update> {
    const answerUser = await this.prisma.answerUser.update({
      where: { answerUserId },
      data: {
        status: data.status,
        voteType: data.voteType,
      },
    });

    if (returnEntity) {
      return AnswerUserMapper.toEntity(answerUser);
    }
  }

  async delete ({ answerUserId }: AnswerUserRepositoryInput.Delete): Promise<AnswerUserRepositoryOutput.Delete> {
    await this.prisma.answerUser.delete({
      where: { answerUserId },
    });
  }
}