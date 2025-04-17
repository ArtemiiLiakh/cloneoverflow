import { NoEntityWithIdException, OrderByEnum } from '@cloneoverflow/common';
import { QuestionViewer } from '@core/models/question/QuestionViewer';
import { QuestionRepoAddViewerInput, QuestionRepoAddViewerOutput } from '@core/repositories/question/dtos/AddViewer';
import { QuestionRepoCloseQuestionInput, QuestionRepoCloseQuestionOutput } from '@core/repositories/question/dtos/CloseQuestion';
import { QuestionRepoCreateInput, QuestionRepoCreateOutput } from '@core/repositories/question/dtos/Create';
import { QuestionRepoDeleteInput, QuestionRepoDeleteOutput } from '@core/repositories/question/dtos/Delete';
import { QuestionRepoGetBestOwnerQuestionInput, QuestionRepoGetBestOwnerQuestionOutput } from '@core/repositories/question/dtos/GetBestOwnerQuestion';
import { QuestionRepoGetByIdInput, QuestionRepoGetByIdOutput } from '@core/repositories/question/dtos/GetById';
import { QuestionRepoGetDetailedByIdInput, QuestionRepoGetDetailedByIdOutput } from '@core/repositories/question/dtos/GetDetailedById';
import { QuestionRepoGetOwnerQuestionsInput, QuestionRepoGetOwnerQuestionsOutput } from '@core/repositories/question/dtos/GetOwnerQuestions';
import { QuestionRepoGetViewerInput, QuestionRepoGetViewerOutput } from '@core/repositories/question/dtos/GetViewer';
import { QuestionRepoIsExistsInput, QuestionRepoIsExistsOutput } from '@core/repositories/question/dtos/IsExists';
import { QuestionRepoOpenQuestionInput, QuestionRepoOpenQuestionOutput } from '@core/repositories/question/dtos/OpenQuestion';
import { QuestionRepoRefTagsInput, QuestionRepoRefTagsOutput } from '@core/repositories/question/dtos/RefTags';
import { QuesitonRepoSearchInput, QuestionRepoSearchOutput } from '@core/repositories/question/dtos/Search';
import { QuestionRepoUnrefAllTagsInput, QuestionRepoUnrefAllTagsOutput } from '@core/repositories/question/dtos/UnrefAllTags';
import { QuestionRepoUpdateInput, QuestionRepoUpdateOutput } from '@core/repositories/question/dtos/Update';
import { QuestionRepoVoteDownInput, QuestionRepoVoteDownOutput } from '@core/repositories/question/dtos/VoteDown';
import { QuestionRepoVoteUpInput, QuestionRepoVoteUpOutput } from '@core/repositories/question/dtos/VoteUp';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { PrismaClient } from '@prisma/client';
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
      throw new NoEntityWithIdException('Question');
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
    { questionId, voterId }: QuestionRepoGetDetailedByIdInput,
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
            userId: voterId, 
            questionId: questionId ? +questionId : undefined,
          },
        },
      },
    });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }

    return QuestionDetailsMapper.toEntity(
      question, 
      question.owner,
      question.voters[0],
      question.tags,
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
          owner: where.authors ? {
            name: { in: where.authors },
          } : undefined,
          tags: where.tags ? {
            some: {
              name: { in: where.tags },
            },
          } : undefined,
        },
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