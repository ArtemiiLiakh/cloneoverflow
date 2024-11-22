import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerRepositoryInput } from '@core/domain/repositories/answer/input/AnswerRepositoryInput';
import { AnswerRepositoryOutput } from '@core/domain/repositories/answer/output/AnswerRepositoryOutput';
import { PrismaClient } from '@prisma/client';
import { PrismaPaginationRepository } from './PrismaPagination';
import { AnswerOrderByAdapter } from '../adapters/orderBy/AnswerOrderByAdapter';
import { AnswerRepositoryMapper } from '../adapters/repositoryMappers/AnswerRepositoryMapper';
import { AnswerWhereAdapter } from '../adapters/where/answer/AnswerWhereAdapter';
import { AnswerSelectAdapter } from '../adapters/select/AnswerSelectAdapter';

export class PrismaAnswerRepository implements AnswerRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async create ({ answer }: AnswerRepositoryInput.Create): Promise<AnswerRepositoryOutput.Create> {
    await this.prisma.answer.create({
      data: {
        id: answer.id,
        questionId: answer.questionId,
        ownerId: answer.ownerId,
        text: answer.text,
        isSolution: answer.isSolution,
        rate: answer.rate,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
      },
    });
  }

  async findOne ({ where, options }: AnswerRepositoryInput.FindOne): Promise<AnswerRepositoryOutput.FindOne> {
    const answer = await this.prisma.answer.findFirst({
      where: AnswerWhereAdapter(where),
      select: AnswerSelectAdapter(options?.select, options?.include, options?.count),
      orderBy: AnswerOrderByAdapter(options?.orderBy),
    }); 

    if (!answer) return null;

    return AnswerRepositoryMapper.findOne(answer);
  }

  findById ({ id, options }: AnswerRepositoryInput.FindById): Promise<AnswerRepositoryOutput.FindById> {
    return this.findOne({
      where: { id },
      options,
    });
  }

  count ({ where }: AnswerRepositoryInput.Count): Promise<AnswerRepositoryOutput.Count> {
    return this.prisma.answer.count({
      where: AnswerWhereAdapter(where),
    });
  }

  async findMany ({ where, options }: AnswerRepositoryInput.FindMany): Promise<AnswerRepositoryOutput.FindMany> {
    const answers = await this.prisma.answer.findMany({
      where: AnswerWhereAdapter(where),
      select: AnswerSelectAdapter(options?.select, options?.include, options?.count),
      orderBy: AnswerOrderByAdapter(options?.orderBy),
      skip: options?.offset,
      take: options?.take,
    });

    return AnswerRepositoryMapper.findMany(answers);
  }

  async paginate ({ where, options, pagination }: AnswerRepositoryInput.Paginate): Promise<AnswerRepositoryOutput.Paginate> {
    const answers = await PrismaPaginationRepository.paginate(this.prisma.answer, {
      where: AnswerWhereAdapter(where),
      select: AnswerSelectAdapter(options?.select, options?.include, options?.count),
      orderBy: AnswerOrderByAdapter(options?.orderBy),
      skip: options?.offset,
      take: options?.take,
    }, pagination);

    return AnswerRepositoryMapper.paginate(answers);
  }

  async update ({ id, answer }: AnswerRepositoryInput.Update): Promise<AnswerRepositoryOutput.Update> {
    const updatedAnswer = await this.prisma.answer.update({
      where: {
        id,
      },
      data: {
        ownerId: answer.ownerId,
        questionId: answer.questionId,
        isSolution: answer.isSolution,
        text: answer.text,
        rate: answer.rate,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
      },
    });

    return AnswerRepositoryMapper.update(updatedAnswer);
  }

  async updateMany ({ where, answer }: AnswerRepositoryInput.UpdateMany): Promise<AnswerRepositoryOutput.UpdateMany> {
    await this.prisma.answer.updateMany({
      where: AnswerWhereAdapter(where),
      data: {
        ownerId: answer.ownerId,
        questionId: answer.questionId,
        isSolution: answer.isSolution,
        text: answer.text,
        rate: answer.rate,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
      },
    });
  }

  async delete ({ answer }: AnswerRepositoryInput.Delete): Promise<AnswerRepositoryOutput.Delete> {
    await this.prisma.answer.delete({
      where: {
        id: answer.id,
      },
    });
  }
}