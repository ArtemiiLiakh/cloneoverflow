import { NoEntityWithIdException, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionRepositoryInput } from '@core/repositories/question/dtos/QuestionRepositoryInput';
import { QuestionRepositoryOutput } from '@core/repositories/question/dtos/QuestionRepositoryOutput';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { PrismaClient } from '@prisma/client';
import { QuestionCountsAdapter } from '../adapters/counts/QuestionCountsAdapter';
import { AnswerMapper } from '../adapters/entityMappers/AnswerMapper';
import { QuestionMapper } from '../adapters/entityMappers/QuestionMapper';
import { TagMapper } from '../adapters/entityMappers/TagMapper';
import { UserMapper } from '../adapters/entityMappers/UserMapper';
import { QuestionIncludeAdapter } from '../adapters/include/QuestionIncludeAdapter';
import { QuestionOrderByAdapter } from '../adapters/orderBy/QuestionOrderByAdapter';
import { QuestionSelectAdapter } from '../adapters/select/QuestionSelectAdapter';
import { QuestionWhereAdapter } from '../adapters/where/QuestionWhereAdapter';
import { uuidToBytes } from '../utils/uuid';
import { PrismaPaginationRepository } from './PrismaPaginationRepository';

export class PrismaQuestionRepository implements QuestionRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async isExist (where: QuestionRepositoryInput.IsExist): Promise<QuestionRepositoryOutput.IsExist> {
    const question = await this.prisma.question.findFirst({
      where: QuestionWhereAdapter(where),
      select: { id: true },
    });

    return !!question;
  }

  async getById (
    { questionId }: QuestionRepositoryInput.GetById,
  ): Promise<QuestionRepositoryOutput.GetById> {
    const question = await this.prisma.question.findFirst({
      where: { id: +questionId },
    });

    if (!question) throw new NoEntityWithIdException('Question');

    return QuestionMapper.toEntity(question);
  }

  async getQuestion (
    { where, counts, include, orderBy }: QuestionRepositoryInput.GetQuestion,
  ): Promise<QuestionRepositoryOutput.GetQuestion> {
    const question = await this.prisma.question.findFirst({
      where: QuestionWhereAdapter(where),
      include: {
        ...QuestionIncludeAdapter(include),
        ...QuestionCountsAdapter(counts),
      },
      orderBy: QuestionOrderByAdapter(orderBy),
    });

    if (!question) throw new NoEntityWithIdException('Question');

    return {
      entity: QuestionMapper.toEntity(question),
      owner: question.owner ? UserMapper.toEntity(question.owner) : undefined,
      answers: question.answers?.map(AnswerMapper.toEntity),
      tags: question.tags?.map(TagMapper.toEntity),
      counts: question._count ? {
        answers: question._count.answers,
        tags: question._count.tags,
      } : undefined,
    };
  }

  async getPartialQuestion (
    { where, select, counts, include, orderBy }: QuestionRepositoryInput.GetPartialQuestion,
  ): Promise<QuestionRepositoryOutput.GetPartialQuestion> {
    const question = await this.prisma.question.findFirst({
      where: QuestionWhereAdapter(where),
      select: {
        ...QuestionSelectAdapter(select),
        ...QuestionCountsAdapter(counts),
        ...QuestionIncludeAdapter(include),
      },
      orderBy: QuestionOrderByAdapter(orderBy),
    });

    if (!question) throw new NoEntityWithIdException('Question');

    return {
      entity: QuestionMapper.toEntity(question),
      owner: question.owner ? UserMapper.toEntity(question.owner) : undefined,
      answers: question.answers?.map(AnswerMapper.toEntity),
      tags: question.tags?.map(TagMapper.toEntity),
      counts: question._count ? {
        answers: question._count.answers,
        tags: question._count.tags,
      } : undefined,
    };
  }

  async getPartialById (
    { questionId, select }: QuestionRepositoryInput.GetPartialById,
  ): Promise<QuestionRepositoryOutput.GetPartialById> {
    const question = await this.prisma.question.findFirst({
      where: { id: +questionId },
      select: QuestionSelectAdapter(select),
    });

    if (!question) throw new NoEntityWithIdException('Question');

    return QuestionMapper.toEntity(question);
  }

  async getMany (
    { where, select, counts, orderBy, include, pagination }: QuestionRepositoryInput.GetMany,
  ): Promise<QuestionRepositoryOutput.GetMany> {
    const questions = await PrismaPaginationRepository.paginate(
      this.prisma.question.findMany.bind(this.prisma),
      this.prisma.question.count.bind(this.prisma),
      {
        where: QuestionWhereAdapter(where),
        select: {
          ...QuestionSelectAdapter(select),
          ...QuestionCountsAdapter(counts, where),
          ...QuestionIncludeAdapter(include),
        },
        orderBy: QuestionOrderByAdapter(orderBy),
      },
      pagination,
    );

    return {
      data: questions.data.map((question) => ({
        entity: QuestionMapper.toEntity(question),
        owner: question.owner ? UserMapper.toEntity(question.owner) : undefined,
        answers: question.answers?.map(AnswerMapper.toEntity),
        tags: question.tags?.map(TagMapper.toEntity),
        counts: {
          answers: question._count.answers,
          tags: question._count.tags,
          users: question._count.questionUsers,
        },
      })),
      pagination: questions.pagination,
    };
  }

  async create (
    { question, returnId }: QuestionRepositoryInput.Create,
  ): Promise<QuestionRepositoryOutput.Create> {
    const questionId = await this.prisma.question.create({
      data: {
        ownerId: uuidToBytes(question.ownerId),
        title: question.title,
        text: question.text,
        rate: question.rating,
        views: question.views,
        isClosed: question.isClosed,
      },
      select: returnId ? { id: true } : undefined,
    });

    if (returnId) return questionId.id.toString();
  }

  async update (
    { questionId, question, returnEntity }: QuestionRepositoryInput.Update,
  ): Promise<QuestionRepositoryOutput.Update> {
    const updatedQuestion = await this.prisma.question.update({
      where: { id: +questionId },
      data: {
        title: question.title,
        text: question.text,
      },
      select: returnEntity ? undefined : {},
    });

    if (returnEntity) return QuestionMapper.toEntity(updatedQuestion);
  }

  count (
    { where }: QuestionRepositoryInput.Count,
  ): Promise<QuestionRepositoryOutput.Count> {
    return this.prisma.question.count({
      where: QuestionWhereAdapter(where),
    });
  }

  async delete (
    { questionId }: QuestionRepositoryInput.Delete,
  ): Promise<QuestionRepositoryOutput.Delete> {
    await this.prisma.question.delete({
      where: { id: +questionId },
    });
  }

  async refTags (
    { questionId, tags }: QuestionRepositoryInput.RefTags,
  ): Promise<QuestionRepositoryOutput.RefTags> {
    await this.prisma.question.update({
      where: { id: +questionId },
      data: {
        tags: {
          connect: tags.map(tag => ({
            id: +tag.id,
          })),
        },
      },
    });
  }

  async unrefAllTags (
    { questionId }: QuestionRepositoryInput.UnrefTags,
  ): Promise<QuestionRepositoryOutput.UnrefTags> {
    await this.prisma.question.update({
      where: { id: +questionId },
      data: {
        tags: {
          set: [],
        },
      },
    });
  }

  async addRating (
    { questionId, voteType }: QuestionRepositoryInput.AddRating,
  ): Promise<QuestionRepositoryOutput.AddRating> {
    await this.prisma.question.update({
      where: { id: +questionId },
      data: {
        rate: {
          increment: voteType === VoteTypeEnum.UP ? 1 : -1,
        },
      },
    });
  }

  async addViewer (
    { questionId }: QuestionRepositoryInput.AddViewer,
  ): Promise<QuestionRepositoryOutput.AddViewer> {
    await this.prisma.question.update({
      where: { id: +questionId },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }

  async openQuestion (
    { questionId }: QuestionRepositoryInput.OpenQuestion,
  ): Promise<QuestionRepositoryOutput.OpenQuestion> {
    await this.prisma.question.update({
      where: { id: +questionId },
      data: {
        isClosed: false,
        answers: {
          updateMany: {
            where: { isSolution: true },
            data: { isSolution: false },
          },
        },
      },
    });
  }

  async closeQuestion (
    { questionId, answerId }: QuestionRepositoryInput.CloseQuestion,
  ): Promise<QuestionRepositoryOutput.CloseQuestion> {
    await this.prisma.question.update({
      where: { id: +questionId },
      data: {
        isClosed: true,
        answers: {
          update: {
            where: { id: +answerId },
            data: { isSolution: true },
          },
        },
      },
    }); 
  }
}