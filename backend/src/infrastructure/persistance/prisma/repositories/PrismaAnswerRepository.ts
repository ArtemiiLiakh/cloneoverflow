import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerRepositoryInput } from '@core/domain/repositories/answer/dtos/AnswerRepositoryInput';
import { AnswerRepositoryOutput } from '@core/domain/repositories/answer/dtos/AnswerRepositoryOutput';
import { PrismaClient } from '@prisma/client';
import { AnswerMapper } from '../adapters/entityMappers/AnswerMapper';
import { QuestionMapper } from '../adapters/entityMappers/QuestionMapper';
import { UserMapper } from '../adapters/entityMappers/UserMapper';
import { AnswerIncludeAdapter } from '../adapters/include/AnswerIncludeAdapter';
import { AnswerOrderByAdapter } from '../adapters/orderBy/AnswerOrderByAdapter';
import { AnswerSelectAdapter } from '../adapters/select/AnswerSelectAdapter';
import { AnswerWhereAdapter } from '../adapters/where/answer/AnswerWhereAdapter';
import { PrismaPaginationRepository } from './PrismaPagination';
import { VoteTypeEnum } from '@cloneoverflow/common';

export class PrismaAnswerRepository implements AnswerRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async isExist (
    { answerId }: AnswerRepositoryInput.IsExist,
  ): Promise<AnswerRepositoryOutput.IsExist> {
    const answer = await this.prisma.answer.findFirst({
      where: { answerId },
      select: { answerId: true },
    });

    return !!answer;
  }

  async getById (
    { answerId }: AnswerRepositoryInput.GetById,
  ): Promise<AnswerRepositoryOutput.GetById> {
    const answer = await this.prisma.answer.findFirst({ 
      where: { answerId },
    });
    
    if (!answer) return null;
    return AnswerMapper.toEntity(answer);
  }

  async getAnswer (
    { where, orderBy, include }: AnswerRepositoryInput.GetAnswer,
  ): Promise<AnswerRepositoryOutput.GetAnswer> {
    const answer = await this.prisma.answer.findFirst({
      where: AnswerWhereAdapter(where),
      orderBy: AnswerOrderByAdapter(orderBy),
      include: AnswerIncludeAdapter(include),
    });

    if (!answer) return null;
    return {
      entity: AnswerMapper.toEntity(answer),
      owner: answer.owner ? UserMapper.toEntity(answer.owner) : undefined,
      question: answer.question ? QuestionMapper.toEntity(answer.question) : undefined,
    };
  }

  async getPartialAnswer (
    { where, select, orderBy, include }: AnswerRepositoryInput.GetPartialAnswer,
  ): Promise<AnswerRepositoryOutput.GetPartialAnswer> {
    const answer = await this.prisma.answer.findFirst({
      where: AnswerWhereAdapter(where),
      select: {
        ...AnswerSelectAdapter(select),
        ...AnswerIncludeAdapter(include),
      },
      orderBy: AnswerOrderByAdapter(orderBy),
    });

    if (!answer) return null;
    return {
      entity: AnswerMapper.toEntity(answer),
      owner: answer.owner ? UserMapper.toEntity(answer.owner) : undefined,
      question: answer.question ? QuestionMapper.toEntity(answer.question) : undefined,
    };
  }

  async getPartialById (
    { answerId, select }: AnswerRepositoryInput.GetPartialById,
  ): Promise<AnswerRepositoryOutput.GetPartialById> {
    const answer = await this.prisma.answer.findFirst({
      where: { answerId },
      select: AnswerSelectAdapter(select),
    });

    if (!answer) return null;
    return AnswerMapper.toEntity(answer);
  }

  async getMany (
    { where, select, orderBy, include, pagination }: AnswerRepositoryInput.GetMany,
  ): Promise<AnswerRepositoryOutput.GetMany> {
    const answers = await PrismaPaginationRepository.paginate(
      this.prisma.answer.findMany.bind(this.prisma),
      this.prisma.answer.count.bind(this.prisma),
      {
        where: AnswerWhereAdapter(where),
        orderBy: AnswerOrderByAdapter(orderBy),
        select: {
          ...AnswerSelectAdapter(select),
          ...AnswerIncludeAdapter(include),
        },
      },
      pagination,
    );

    return {
      data: answers.data.map((answer) => ({
        entity: AnswerMapper.toEntity(answer),
        owner: answer.owner ? UserMapper.toEntity(answer.owner) : undefined,
        question: answer.question ? QuestionMapper.toEntity(answer.question) : undefined,
      })),
      pagination: answers.pagination,
    };
  }

  count (
    { where }: AnswerRepositoryInput.Count,
  ): Promise<AnswerRepositoryOutput.Count> {
    return this.prisma.answer.count({
      where: AnswerWhereAdapter(where),
    });
  }

  async create (
    { answer }: AnswerRepositoryInput.Create,
  ): Promise<AnswerRepositoryOutput.Create> {
    await this.prisma.answer.create({
      data: {
        answerId: answer.id,
        ownerId: answer.ownerId,
        questionId: answer.questionId,
        text: answer.text,
        rate: answer.rating,
        isSolution: answer.isSolution,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
        owner: {
          connect: { userId: answer.ownerId },
        },
        question: {
          connect: { questionId: answer.questionId },
        },
      },
    });
  }

  async update (
    { answerId, answer, returnEntity }: AnswerRepositoryInput.Update,
  ): Promise<AnswerRepositoryOutput.Update> {
    const updatedAnswer = await this.prisma.answer.update({
      where: { answerId },
      data: {
        text: answer.text,
      },
    });

    if (returnEntity) return AnswerMapper.toEntity(updatedAnswer);
  }

  async delete (
    { answerId }: AnswerRepositoryInput.Delete,
  ): Promise<AnswerRepositoryOutput.Delete> {
    await this.prisma.answer.delete({
      where: { answerId },
    });
  }

  async addRating ({ 
    answerId,
    voteType,
  }: AnswerRepositoryInput.AddRating): Promise<AnswerRepositoryOutput.AddRating> {
    await this.prisma.answer.update({
      where: { answerId },
      data: {
        rate: {
          increment: voteType === VoteTypeEnum.UP ? 1 : -1,
        },
        owner: {
          update: {
            reputation: {
              increment: voteType === VoteTypeEnum.UP ? 1 : -1,
            },
          },
        },
      },
    });
  }
}