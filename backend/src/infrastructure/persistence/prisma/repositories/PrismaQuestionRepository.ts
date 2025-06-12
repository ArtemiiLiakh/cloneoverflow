import { OrderByEnum } from '@cloneoverflow/common';
import { QuestionIdInvalid } from '@core/question/exceptions/QuestionIdInvalid';
import { QuestionViewer } from '@core/question/QuestionViewer';
import { QuestionRepoAddViewerInput, QuestionRepoAddViewerOutput } from '@core/question/repository/dtos/AddViewer';
import { QuestionRepoCloseQuestionInput, QuestionRepoCloseQuestionOutput } from '@core/question/repository/dtos/CloseQuestion';
import { QuestionRepoCreateInput, QuestionRepoCreateOutput } from '@core/question/repository/dtos/Create';
import { QuestionRepoDeleteInput, QuestionRepoDeleteOutput } from '@core/question/repository/dtos/Delete';
import { QuestionRepoGetBestOwnerQuestionInput, QuestionRepoGetBestOwnerQuestionOutput } from '@core/question/repository/dtos/GetBestOwnerQuestion';
import { QuestionRepoGetByIdInput, QuestionRepoGetByIdOutput } from '@core/question/repository/dtos/GetById';
import { QuestionRepoGetDetailedByIdInput, QuestionRepoGetDetailedByIdOutput } from '@core/question/repository/dtos/GetDetailedById';
import { QuestionRepoGetOwnerQuestionsInput, QuestionRepoGetOwnerQuestionsOutput } from '@core/question/repository/dtos/GetOwnerQuestions';
import { QuestionRepoGetViewerInput, QuestionRepoGetViewerOutput } from '@core/question/repository/dtos/GetViewer';
import { QuestionRepoIsExistsInput, QuestionRepoIsExistsOutput } from '@core/question/repository/dtos/IsExists';
import { QuestionRepoOpenQuestionInput, QuestionRepoOpenQuestionOutput } from '@core/question/repository/dtos/OpenQuestion';
import { QuestionRepoRefTagsInput, QuestionRepoRefTagsOutput } from '@core/question/repository/dtos/RefTags';
import { QuesitonRepoSearchInput, QuestionRepoSearchOutput } from '@core/question/repository/dtos/Search';
import { QuestionRepoUnrefAllTagsInput, QuestionRepoUnrefAllTagsOutput } from '@core/question/repository/dtos/UnrefAllTags';
import { QuestionRepoUpdateInput, QuestionRepoUpdateOutput } from '@core/question/repository/dtos/Update';
import { QuestionRepoVoteDownInput, QuestionRepoVoteDownOutput } from '@core/question/repository/dtos/VoteDown';
import { QuestionRepoVoteUpInput, QuestionRepoVoteUpOutput } from '@core/question/repository/dtos/VoteUp';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Prisma, PrismaClient } from '@prisma/client';
import { QuestionDetailsMapper } from '../adapters/entityMappers/QuestionDetailsMapper';
import { QuestionMapper } from '../adapters/entityMappers/QuestionMapper';
import { QuestionOwnerMapper } from '../adapters/entityMappers/QuestionOwnerMapper';
import { TagMapper } from '../adapters/entityMappers/TagMapper';
import { QuestionSelectAdapter } from '../adapters/select/QuestionSelectAdapter';
import { PrismaPaginationRepository } from './PrismaPaginationRepository';

export class PrismaQuestionRepository implements QuestionRepository {
  constructor (
    private client: PrismaClient,
  ) {}

  async getById (
    { questionId, select }: QuestionRepoGetByIdInput,
  ): Promise<QuestionRepoGetByIdOutput> {
    const question = await this.client.question.findFirst({
      where: {
        id: +questionId,
      },
      select: QuestionSelectAdapter(select),
    });

    if (!question) {
      throw new QuestionIdInvalid();
    }

    return QuestionMapper.toEntity(question);
  }

  async getBestOwnerQuestion (
    { ownerId, select }: QuestionRepoGetBestOwnerQuestionInput,
  ): Promise<QuestionRepoGetBestOwnerQuestionOutput> {
    const question = await this.client.question.findFirst({
      where: {
        ownerId,
      },
      select: {
        ...QuestionSelectAdapter(select),
        _count: {
          select: {
            answers: true,
          },
        },
        tags: true,
      },
      orderBy: { rating: OrderByEnum.DESC },
    });

    if (!question) {
      return null;
    }

    return {
      entity: QuestionMapper.toEntity(question),
      tags: question.tags.map(TagMapper.toEntity),
      answersAmount: question._count.answers,
    };
  }

  async getDetailedById (
    { questionId, executorId }: QuestionRepoGetDetailedByIdInput,
  ): Promise<QuestionRepoGetDetailedByIdOutput> {
    const question = await this.client.question.findFirst({
      where: {
        id: +questionId,
      },
      include: {
        owner: true,
        tags: true,
        voters: {
          where: { 
            userId: executorId, 
          },
        },
        favorites: {
          where: {
            userId: executorId,
          },
        },
      },
    });

    if (!question) {
      throw new QuestionIdInvalid();
    }

    return QuestionDetailsMapper.toEntity(
      question, 
      question.owner,
      question.voters[0],
      question.tags,
      question.favorites.length > 0,
    );
  }

  async getOwnerQuestions (
    { ownerId, searchText, tags, orderBy, pagination }: QuestionRepoGetOwnerQuestionsInput,
  ): Promise<QuestionRepoGetOwnerQuestionsOutput> {
    const questions = await PrismaPaginationRepository.paginate(
      this.client.question.findMany.bind(this.client),
      this.client.question.count.bind(this.client),
      {
        where: {
          ownerId,
          title: {
            contains: searchText,
          },
          tags: {
            some: {
              name: {
                in: tags,
              },
            },
          },
        },
        orderBy: {
          rating: orderBy?.rate,
          createdAt: orderBy?.date,
          answers: orderBy?.answers ? {
            _count: orderBy?.answers,
          } : undefined,
        },
        include: {
          tags: true,
          _count: {
            select: {
              answers: true,
            },
          },
        },
      },
      pagination,
    );

    return {
      data: questions.data.map((question) => ({
        question: QuestionMapper.toEntity(question),
        tags: question.tags.map(TagMapper.toEntity),
        answerAmount: question._count.answers,
      })),
      pagination: questions.pagination,
    };
  }

  async getViewer (
    { userId, questionId }: QuestionRepoGetViewerInput,
  ): Promise<QuestionRepoGetViewerOutput> {
    const viewer = await this.client.questionViewer.findFirst({
      where: {
        userId,
        questionId: +questionId,
      },
    });

    if (!viewer) return null;
    
    return QuestionViewer.new({
      id: viewer.id.toString(),
      userId: viewer.userId,
      questionId: viewer.questionId.toString(),
    });
  }

  async search (
    { where, orderBy, pagination }: QuesitonRepoSearchInput,
  ): Promise<QuestionRepoSearchOutput> {
    const questions = await PrismaPaginationRepository.paginate(
      this.client.question.findMany.bind(this.client),
      this.client.question.count.bind(this.client),
      {
        where: {
          title: where.searchText ? {
            contains: where.searchText,
          } : undefined,
          OR: where.keywords?.map((keyword) => ({
            title: { contains: keyword },
          })),
          rating: where.rating ? {
            lt: where.rating?.ls,
            gt: where.rating?.gt,
          } : undefined,
          views: where.views ? {
            lt: where.views?.ls,
            gt: where.views?.gt,
          } : undefined,
          createdAt: where.createdAt ? {
            lt: where.createdAt?.ls,
            gt: where.createdAt?.gt,
          } : undefined,
          isClosed: where.isClosed,

          owner: {
            OR: where.authors?.map((author) => ({
              OR: [
                { name: { contains: author } },
                { username: { contains: author } },
              ],
            })),
          },
          tags: where.tags ? {
            some: {
              name: { in: where.tags },
            },
          } : undefined,
          favorites: where.favorite ? {
            some: {
              userId: where.favorite.userId,
            },
          } : undefined,
        } as Prisma.QuestionWhereInput,
        orderBy: {
          rating: orderBy?.rate,
          views: orderBy?.views,
          isClosed: orderBy?.isClosed,
          createdAt: orderBy?.date,
          answers: orderBy?.answers ? {
            _count: orderBy?.answers,
          } : undefined,
        },
        include: {
          owner: true,
          tags: true,
          _count: {
            select: {
              answers: true,
            },
          },
        },
      },
      pagination,
    );

    return {
      data: questions.data.map((question) => ({
        question: QuestionMapper.toEntity(question),
        owner: question.owner ? QuestionOwnerMapper(question.id.toString(), question.owner) : null,
        tags: question.tags.map(TagMapper.toEntity),
        answersAmount: question._count.answers,
      })),
      pagination: questions.pagination,
    };
  }

  async isExist (
    { questionId }: QuestionRepoIsExistsInput,
  ): Promise<QuestionRepoIsExistsOutput> {
    const res = await this.client.question.findFirst({
      where: {
        id: +questionId,
      },
      select: {
        id: true,
      },
    });

    return !!res;
  }

  async create (
    { ownerId, title, text }: QuestionRepoCreateInput,
  ): Promise<QuestionRepoCreateOutput> {
    const newQuestion = await this.client.question.create({
      data: {
        ownerId,
        title,
        text,
      },
    });

    return QuestionMapper.toEntity(newQuestion);
  }

  async update (
    { questionId, data }: QuestionRepoUpdateInput,
  ): Promise<QuestionRepoUpdateOutput> {
    const question = await this.client.question.update({
      where: {
        id: +questionId,
      },
      data: {
        title: data.title,
        text: data.text,
      },
    });
    
    return QuestionMapper.toEntity(question);
  }

  async delete (
    { questionId }: QuestionRepoDeleteInput,
  ): Promise<QuestionRepoDeleteOutput> {
    await this.client.question.delete({
      where: {
        id: +questionId,
      },
    });
  }

  async addViewer (
    { questionId, userId }: QuestionRepoAddViewerInput,
  ): Promise<QuestionRepoAddViewerOutput> {
    await this.client.question.update({
      where: {
        id: +questionId,
      },
      data: {
        views: {
          increment: 1,
        },
        viewers: {
          create: {
            userId,
          },
        },
      },
    });
  }

  async refTags (
    { questionId, tags }: QuestionRepoRefTagsInput,
  ): Promise<QuestionRepoRefTagsOutput> {
    await this.client.question.update({
      where: {
        id: +questionId,
      },
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
    { questionId }: QuestionRepoUnrefAllTagsInput,
  ): Promise<QuestionRepoUnrefAllTagsOutput> {
    await this.client.question.update({
      where: {
        id: +questionId,
      },
      data: {
        tags: {
          set: [],
        },
      },
    });
  }

  async openQuestion (
    { questionId }: QuestionRepoOpenQuestionInput,
  ): Promise<QuestionRepoOpenQuestionOutput> {
    await this.client.question.update({
      where: {
        id: +questionId,
      },
      data: {
        isClosed: false,
      },
    });
  }

  async closeQuestion (
    { questionId }: QuestionRepoCloseQuestionInput,
  ): Promise<QuestionRepoCloseQuestionOutput> {
    await this.client.question.update({
      where: {
        id: +questionId,
      },
      data: {
        isClosed: true,
      },
    });
  }

  async voteUp (
    { questionId }: QuestionRepoVoteUpInput,
  ): Promise<QuestionRepoVoteUpOutput> {
    await this.client.question.update({
      where: {
        id: +questionId,
      },
      data: {
        rating: {
          increment: 1,
        },
      },
    });
  }

  async voteDown (
    { questionId }: QuestionRepoVoteDownInput,
  ): Promise<QuestionRepoVoteDownOutput> {
    await this.client.question.update({
      where: {
        id: +questionId,
      },
      data: {
        rating: {
          decrement: 1,
        },
      },
    });
  }
}