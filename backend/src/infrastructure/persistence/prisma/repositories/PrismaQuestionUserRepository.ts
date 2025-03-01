import { QuestionUserRepositoryInput } from '@core/repositories/question/dtos/questionUser/QuestionUserRepositoryInput';
import { QuestionUserRepositoryOutput } from '@core/repositories/question/dtos/questionUser/QuestionUserRepositoryOutput';
import { QuestionUserRepository } from '@core/repositories/question/QuestionUserRepository';
import { PrismaClient } from '@prisma/client';
import { QuestionUserMapper } from '../adapters/entityMappers/QuestionUserMapper';
import { QuestionUserWhereAdapter } from '../adapters/where/QuestionUserWhereAdapter';
import { uuidToBytes } from '../utils/uuid';

export class PrismaQuestionUserRepository implements QuestionUserRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}
  
  async getOne (
    { where }: QuestionUserRepositoryInput.GetOne,
  ): Promise<QuestionUserRepositoryOutput.GetOne> {
    const questionUser = await this.prisma.questionUser.findFirst({
      where: QuestionUserWhereAdapter(where),
    });

    if (!questionUser) return null;

    return QuestionUserMapper.toEntity(questionUser);
  }

  async create (
    { user, returnId: returnId }: QuestionUserRepositoryInput.Create,
  ): Promise<QuestionUserRepositoryOutput.Create> {
    const questionUserId = await this.prisma.questionUser.create({
      data: {
        questionId: +user.questionId,
        userId: uuidToBytes(user.userId),
        status: user.status,
        voteType: user.voteType,
      },
      select: returnId ? { id: true } : undefined,
    });

    if (returnId) return questionUserId.id.toString();
  }

  async update (
    { questionUserId, data, returnEntity }: QuestionUserRepositoryInput.Update,
  ): Promise<QuestionUserRepositoryOutput.Update> {
    const questionUser = await this.prisma.questionUser.update({
      where: { id: +questionUserId },
      data: {
        status: data.status,
        voteType: data.voteType,
      },
    });

    if (returnEntity) return QuestionUserMapper.toEntity(questionUser);
  }

  async delete (
    { questionUserId }: QuestionUserRepositoryInput.Delete,
  ): Promise<QuestionUserRepositoryOutput.Delete> {
    await this.prisma.questionUser.findFirst({
      where: { id: +questionUserId },
    });
  }
}