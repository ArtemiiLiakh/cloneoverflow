import { QuestionUserRepositoryInput } from '@core/domain/repositories/question/dtos/questionUser/QuestionUserRepositoryInput';
import { QuestionUserRepositoryOutput } from '@core/domain/repositories/question/dtos/questionUser/QuestionUserRepositoryOutput';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { PrismaClient } from '@prisma/client';
import { QuestionUserWhereAdapter } from '../adapters/where/question/QuestionUserWhereAdapter';
import { QuestionUserMapper } from '../adapters/entityMappers/QuestionUserMapper';

export class PrismaQuestionUserRepository implements QuestionUserRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}
  
  async getOne (
    { where }: QuestionUserRepositoryInput.GetOne,
  ): Promise<QuestionUserRepositoryOutput.GetOne> {
    const questionUser = await this.prisma.userQuestions.findFirst({
      where: QuestionUserWhereAdapter(where),
    });

    if (!questionUser) return null;

    return QuestionUserMapper.toEntity(questionUser);
  }

  async create (
    { user }: QuestionUserRepositoryInput.Create,
  ): Promise<QuestionUserRepositoryOutput.Create> {
    await this.prisma.userQuestions.create({
      data: {
        id: user.id,
        questionId: user.questionId,
        userId: user.userId,
        status: user.status,
        voteType: user.voteType,
      },
    });
  }

  async update (
    { questionUserId, data, returnEntity }: QuestionUserRepositoryInput.Update,
  ): Promise<QuestionUserRepositoryOutput.Update> {
    const questionUser = await this.prisma.userQuestions.update({
      where: { id: questionUserId },
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
    await this.prisma.userQuestions.findFirst({
      where: { id: questionUserId },
    });
  }
}