import { QuestionRepositoryOutput } from '@core/domain/repositories/question/output/QuestionRepositoryOutput';
import { QuestionRepositoryInput } from '@core/domain/repositories/question/input/QuestionRepositoryInput';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { PrismaClient } from '@prisma/client';
import { PrismaPaginationRepository } from './PrismaPagination';
import { QuestionIncludeAdapter } from '../adapters/include/QuestionIncludeAdapter';
import { QuestionOrderByAdapter } from '../adapters/orderBy/QuestionOrderByAdapter';
import { QuestionRepositoryMapper } from '../adapters/repositoryMappers/QuestionRepositoryMapper';
import { QuestionWhereAdapter } from '../adapters/where/question/QuestionWhereAdapter';
import { QuestionSelectAdapter } from '../adapters/select/QuestionSelectAdapter';

export class PrismaQuestionRepository implements QuestionRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}
  
  async findOne ({ where, options }: QuestionRepositoryInput.FindOne): Promise<QuestionRepositoryOutput.FindOne> {
    const question = await this.prisma.question.findFirst({
      where: QuestionWhereAdapter(where),
      select: QuestionSelectAdapter(options?.select, options?.include, options?.count),
      orderBy: QuestionOrderByAdapter(options?.orderBy),
    });

    if (!question) return null;

    return QuestionRepositoryMapper.findOne(question);
  }
  
  findById ({ id, options }: QuestionRepositoryInput.FindById): Promise<QuestionRepositoryOutput.FindById> {
    return this.findOne({
      where: { id },
      options,
    });
  }

  async findMany ({ where, options }: QuestionRepositoryInput.FindMany): Promise<QuestionRepositoryOutput.FindMany> {
    const questions = await this.prisma.question.findMany({
      where: QuestionWhereAdapter(where),
      select: QuestionSelectAdapter(options?.select, options?.include, options?.count),
      orderBy: QuestionOrderByAdapter(options?.orderBy),
      skip: options?.offset,
      take: options?.take,
    });

    return QuestionRepositoryMapper.findMany(questions);
  }

  count (payload: QuestionRepositoryInput.Count): Promise<QuestionRepositoryOutput.Count> {
    return this.prisma.question.count({
      where: QuestionWhereAdapter(payload.where),
    });
  }
  
  async paginate ({ where, options, pagination }: QuestionRepositoryInput.Paginate): Promise<QuestionRepositoryOutput.Paginate> {
    const questions = await PrismaPaginationRepository.paginate(
      this.prisma.question, 
      {
        where: QuestionWhereAdapter(where),
        select: QuestionIncludeAdapter(options?.include, options?.count),
        orderBy: QuestionOrderByAdapter(options?.orderBy),
        skip: options?.offset,
        take: options?.take,
      }, 
      pagination,
    );

    return QuestionRepositoryMapper.paginate(questions);
  }

  async create ({ question }: QuestionRepositoryInput.Create): Promise<QuestionRepositoryOutput.Create> {
    await this.prisma.question.create({
      data: {
        id: question.id,
        title: question.title,
        text: question.text,
        ownerId: question.ownerId,
        rate: question.rate,
        views: question.views,
        isClosed: question.isClosed,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      },
    });
  }

  async update ({ id, question }: QuestionRepositoryInput.Update): Promise<QuestionRepositoryOutput.Update> {
    const updatedQuestion = await this.prisma.question.update({
      where: { 
        id,
      },
      data: {
        ownerId: question.ownerId,
        title: question.title,
        text: question.text,
        rate: question.rate,
        views: question.views,
        isClosed: question.isClosed,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      },
    });

    return QuestionRepositoryMapper.update(updatedQuestion);
  }

  async delete ({ question }: QuestionRepositoryInput.Delete): Promise<QuestionRepositoryOutput.Delete> {
    await this.prisma.question.delete({
      where: {
        id: question.id,
      },
    });
  }

  async refTags (payload: QuestionRepositoryInput.RefTags): Promise<QuestionRepositoryOutput.RefTags> {
    await this.prisma.question.update({
      where: {
        id: payload.id,
      },
      data: {
        tags: {
          connect: payload.tags.map(tag => ({ id: tag.id })),
        },
      },
    });
  }

  async unrefAllTags (payload: QuestionRepositoryInput.UnrefTags): Promise<QuestionRepositoryOutput.UnrefTags> {
    await this.prisma.question.update({
      where: {
        id: payload.id,
      },
      data: {
        tags: {
          set: [],
        },
      },
    });
  }
}