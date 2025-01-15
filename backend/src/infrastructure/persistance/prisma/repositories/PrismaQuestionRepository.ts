import { NoEntityWithIdException, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionRepositoryInput } from '@core/domain/repositories/question/dtos/QuestionRepositoryInput';
import { QuestionRepositoryOutput } from '@core/domain/repositories/question/dtos/QuestionRepositoryOutput';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { PrismaClient } from '@prisma/client';
import { QuestionCountsAdapter } from '../adapters/counts/QuestionCountsAdapter';
import { AnswerMapper } from '../adapters/entityMappers/AnswerMapper';
import { QuestionMapper } from '../adapters/entityMappers/QuestionMapper';
import { TagMapper } from '../adapters/entityMappers/TagMapper';
import { UserMapper } from '../adapters/entityMappers/UserMapper';
import { QuestionIncludeAdapter } from '../adapters/include/QuestionIncludeAdapter';
import { QuestionOrderByAdapter } from '../adapters/orderBy/QuestionOrderByAdapter';
import { QuestionSelectAdapter } from '../adapters/select/QuestionSelectAdapter';
import { QuestionWhereAdapter } from '../adapters/where/question/QuestionWhereAdapter';
import { PrismaPaginationRepository } from './PrismaPaginationRepository';

export class PrismaQuestionRepository implements QuestionRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async isExist (where: QuestionRepositoryInput.IsExist): Promise<QuestionRepositoryOutput.IsExist> {
    const question = await this.prisma.question.findFirst({
      where: QuestionWhereAdapter(where),
      select: { questionId: true },
    });

    return !!question;
  }

  async validateById (
    { questionId }: QuestionRepositoryInput.ValidateById,
  ): Promise<QuestionRepositoryOutput.ValidateById> {
    if (!await this.prisma.question.findFirst({ 
      where: { questionId },
      select: { pk_id: true },
    })) {
      throw new NoEntityWithIdException('Question');
    }
  }

  async getById (
    { questionId }: QuestionRepositoryInput.GetById,
  ): Promise<QuestionRepositoryOutput.GetById> {
    const question = await this.prisma.question.findFirst({
      where: { questionId },
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
      owner: UserMapper.toEntity(question.owner),
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
      where: { questionId },
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
    { question }: QuestionRepositoryInput.Create,
  ): Promise<QuestionRepositoryOutput.Create> {
    await this.prisma.question.create({
      select: { questionId: true },
      data: {
        questionId: question.id,
        ownerId: question.ownerId,
        title: question.title,
        text: question.text,
        rate: question.rating,
        views: question.views,
        isClosed: question.isClosed,
        owner: {
          connect: { userId: question.ownerId },
        },
      },
    });
  }

  async update (
    { questionId, question, returnEntity }: QuestionRepositoryInput.Update,
  ): Promise<QuestionRepositoryOutput.Update> {
    const updatedQuestion = await this.prisma.question.update({
      where: { questionId },
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
      where: { questionId },
    });
  }

  async refTags (
    { questionId, tags }: QuestionRepositoryInput.RefTags,
  ): Promise<QuestionRepositoryOutput.RefTags> {
    await this.prisma.question.update({
      where: { questionId },
      data: {
        tags: {
          connect: tags.map((tag) => ({ tagId: tag.id })),
        },
      },
    });
  }

  async unrefAllTags (
    { questionId }: QuestionRepositoryInput.UnrefTags,
  ): Promise<QuestionRepositoryOutput.UnrefTags> {
    await this.prisma.question.update({
      where: { questionId },
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
      where: { questionId },
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

  async addViewer (
    { questionId }: QuestionRepositoryInput.AddViewer,
  ): Promise<QuestionRepositoryOutput.AddViewer> {
    await this.prisma.question.update({
      where: { questionId },
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
      where: { questionId },
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
      where: { questionId },
      data: {
        isClosed: true,
        answers: {
          update: {
            where: { answerId },
            data: { isSolution: true },
          },
        },
      },
    }); 
  }
}