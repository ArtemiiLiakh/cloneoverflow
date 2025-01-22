import { NoEntityWithIdException, VoteTypeEnum } from '@cloneoverflow/common';
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
import { uuidToBytes } from '../utils/uuid';
import { PrismaPaginationRepository } from './PrismaPaginationRepository';

export class PrismaAnswerRepository implements AnswerRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async isExist (where: AnswerRepositoryInput.IsExist): Promise<AnswerRepositoryOutput.IsExist> {
    const answer = await this.prisma.answer.findFirst({
      where: AnswerWhereAdapter(where),
      select: { id: true },
    });

    return !!answer;
  }

  async validateById (
    { answerId }: AnswerRepositoryInput.ValidateById,
  ): Promise<AnswerRepositoryOutput.ValidateById> {
    if (!await this.prisma.answer.findFirst({ 
      where: { id: +answerId },
      select: { id: true },
    })) {
      throw new NoEntityWithIdException('Answer');
    }
  }
  
  async getById (
    { answerId }: AnswerRepositoryInput.GetById,
  ): Promise<AnswerRepositoryOutput.GetById> {
    const answer = await this.prisma.answer.findFirst({ 
      where: { id: +answerId },
    });
    
    if (!answer) throw new NoEntityWithIdException('Answer');
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

    if (!answer) throw new NoEntityWithIdException('Answer');
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

    if (!answer) throw new NoEntityWithIdException('Answer');
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
      where: { id: +answerId },
      select: AnswerSelectAdapter(select),
    });

    if (!answer) throw new NoEntityWithIdException('Answer');
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
    { answer, returnId: returnId }: AnswerRepositoryInput.Create,
  ): Promise<AnswerRepositoryOutput.Create> {
    const answerId = await this.prisma.answer.create({
      data: {
        ownerId: uuidToBytes(answer.ownerId),
        questionId: +answer.questionId,
        text: answer.text,
        rate: answer.rating,
        isSolution: answer.isSolution,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
      },
      select: returnId ? { id: true } : undefined,
    });

    if (returnId) return answerId.id.toString();
  }

  async update (
    { answerId, answer, returnEntity }: AnswerRepositoryInput.Update,
  ): Promise<AnswerRepositoryOutput.Update> {
    const updatedAnswer = await this.prisma.answer.update({
      where: { id: +answerId },
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
      where: { id: +answerId },
    });
  }

  async addRating ({ 
    answerId,
    voteType,
  }: AnswerRepositoryInput.AddRating): Promise<AnswerRepositoryOutput.AddRating> {
    await this.prisma.answer.update({
      where: { id: +answerId },
      data: {
        rate: {
          increment: voteType === VoteTypeEnum.UP ? 1 : -1,
        },
      },
    });
  }
}