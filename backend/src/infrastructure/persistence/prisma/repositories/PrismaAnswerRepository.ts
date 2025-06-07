import { OrderByEnum } from '@cloneoverflow/common';
import { AnswerIdInvalid } from '@core/answer/exceptions/AnswerIdInvalid';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { AnswerRepoClearSolutionsInput, AnswerRepoClearSolutionsOutput } from '@core/answer/repository/dtos/ClearSolutions';
import { AnswerRepoCreateInput, AnswerRepoCreateOutput } from '@core/answer/repository/dtos/Create';
import { AnswerRepoDeleteInput, AnswerRepoDeleteOutput } from '@core/answer/repository/dtos/Delete';
import { AnswerRepoGetBestOwnerAnswerInput, AnswerRepoGetBestOwnerAnswerOutput } from '@core/answer/repository/dtos/GetBestOwnerAnswer';
import { AnswerRepoGetByIdInput, AnswerRepoGetByIdOutput } from '@core/answer/repository/dtos/GetById';
import { AnswerRepoGetDetailedByIdInput, AnswerRepoGetDetailedByIdOutput } from '@core/answer/repository/dtos/GetDetailedById';
import { AnswerRepoGetOwnerAnswersInput, AnswerRepoGetOwnerAnswersOutput } from '@core/answer/repository/dtos/GetOwnerAnswers';
import { AnswerRepoGetQuestionAnswersInput, AnswerRepoGetQuestionAnswersOutput } from '@core/answer/repository/dtos/GetQuestionAnswers';
import { AnswerRepoIsExistInput, AnswerRepoIsExistOutput } from '@core/answer/repository/dtos/IsExist';
import { AnswerRepoSetAsSolutionInput, AnswerRepoSetAsSolutionOutput } from '@core/answer/repository/dtos/SetAsSolution';
import { AnswerRepoUpdateInput, AnswerRepoUpdateOutput } from '@core/answer/repository/dtos/Update';
import { AnswerRepoVoteDownInput, AnswerRepoVoteDownOutput } from '@core/answer/repository/dtos/VoteDown';
import { AnswerRepoVoteUpInput, AnswerRepoVoteUpOutput } from '@core/answer/repository/dtos/VoteUp';
import { PrismaClient } from '@prisma/client';
import { AnswerDetailsMapper } from '../adapters/entityMappers/AnswerDetailsMapper';
import { AnswerMapper } from '../adapters/entityMappers/AnswerMapper';
import { AnswerSelectAdapter } from '../adapters/select/AnswerSelectAdapter';
import { PrismaPaginationRepository } from './PrismaPaginationRepository';

export class PrismaAnswerRepository implements AnswerRepository {
  constructor (
    private client: PrismaClient,
  ) {}

  async getById (
    { answerId, select }: AnswerRepoGetByIdInput,
  ): Promise<AnswerRepoGetByIdOutput> {
    const answer = await this.client.answer.findFirst({
      where: {
        id: +answerId,
      },
      select: AnswerSelectAdapter(select),
    }); 

    if (!answer) {
      throw new AnswerIdInvalid();
    }

    return AnswerMapper.toEntity(answer);
  }

  async getDetailedById (
    { answerId, voterId }: AnswerRepoGetDetailedByIdInput,
  ): Promise<AnswerRepoGetDetailedByIdOutput> {
    const answer = await this.client.answer.findFirst({
      where: { 
        id: +answerId,
      },
      include: {
        owner: true,
        voters: {
          where: { 
            userId: voterId,
            answerId: answerId ? +answerId : undefined,
          },
        },
      },
    });

    if (!answer) {
      throw new AnswerIdInvalid();
    }

    return AnswerDetailsMapper.toEntity(answer, answer?.owner, answer?.voters[0]);
  }

  async getBestOwnerAnswer (
    { ownerId, select }: AnswerRepoGetBestOwnerAnswerInput,
  ): Promise<AnswerRepoGetBestOwnerAnswerOutput> {
    const answer = await this.client.answer.findFirst({
      where: {
        ownerId,
      },
      orderBy: [
        { rating: OrderByEnum.DESC },
        { isSolution: OrderByEnum.DESC },
      ],
      select: {
        ...AnswerSelectAdapter(select),
        question: {
          select: {
            id: true,
            ownerId: true,
            title: true,
            rating: true,
          },
        },
      },
    });

    if (!answer) {
      return null;
    }

    return {
      entity: AnswerMapper.toEntity(answer),
      question: {
        questionId: answer.question.id.toString(),
        ownerId: answer.question.ownerId ?? '',
        title: answer.question.title,
        rating: answer.question.rating,
      },
    };
  }

  async getOwnerAnswers (
    { ownerId, searchText, orderBy, pagination }: AnswerRepoGetOwnerAnswersInput,
  ): Promise<AnswerRepoGetOwnerAnswersOutput> {
    const answers = await PrismaPaginationRepository.paginate(
      this.client.answer.findMany.bind(this.client),
      this.client.answer.count.bind(this.client),
      {
        where: {
          ownerId,
          text: {
            contains: searchText,
          },
        },
        orderBy: {
          rating: orderBy?.rate,
          createdAt: orderBy?.date,
          isSolution: orderBy?.solution,
        },
        include: {
          question: true,
        },
      },
      pagination,
    );

    return {
      data: answers.data.map(answer => ({
        answer: AnswerMapper.toEntity(answer),
        question: {
          id: answer.question.id.toString(),
          title: answer.question.title,
          rating: answer.question.rating,
        },
      })),
      pagination: answers.pagination,
    };
  }

  async getByQuestionId (
    { questionId, voterId, orderBy, pagination }: AnswerRepoGetQuestionAnswersInput,
  ): Promise<AnswerRepoGetQuestionAnswersOutput> {
    const answers = await PrismaPaginationRepository.paginate(
      this.client.answer.findMany.bind(this.client),
      this.client.answer.count.bind(this.client),
      {
        where: {
          questionId: +questionId,
        },
        orderBy: {
          rating: orderBy?.rate,
          createdAt: orderBy?.date,
          isSolution: orderBy?.solution,
        },
        include: {
          owner: true,
          voters: {
            where: { userId: voterId },
          },
        },
      },
      pagination,
    );

    return {
      data: answers.data.map((answer) => AnswerDetailsMapper.toEntity(answer, answer.owner, answer.voters[0])),
      pagination: answers.pagination,
    };
  }
  
  async isExist (
    { answerId }: AnswerRepoIsExistInput,
  ): Promise<AnswerRepoIsExistOutput> {
    const res = await this.client.answer.findFirst({
      where: {
        id: +answerId,
      },
      select: {
        id: true,
      },
    });

    return !!res;
  }

  async create (
    { ownerId, questionId, text }: AnswerRepoCreateInput,
  ): Promise<AnswerRepoCreateOutput> {
    const newAnswer = await this.client.answer.create({
      data: {
        questionId: +questionId,
        ownerId,
        text,
      },
    });

    return AnswerMapper.toEntity(newAnswer);
  }

  async update (
    { answerId, data }: AnswerRepoUpdateInput,
  ): Promise<AnswerRepoUpdateOutput> {
    const answer = await this.client.answer.update({
      where: {
        id: +answerId,
      },
      data: {
        text: data.text,
      },
    });

    return AnswerMapper.toEntity(answer);
  }

  async delete (
    { answerId }: AnswerRepoDeleteInput,
  ): Promise<AnswerRepoDeleteOutput> {
    await this.client.answer.delete({
      where: {
        id: +answerId,
      },
    });
  }

  async setAsSolution (
    { answerId }: AnswerRepoSetAsSolutionInput,
  ): Promise<AnswerRepoSetAsSolutionOutput> {
    await this.client.answer.update({
      where: {
        id: +answerId,
      },
      data: {
        isSolution: true,
      },
    });
  }

  async clearSolution (
    { questionId }: AnswerRepoClearSolutionsInput,
  ): Promise<AnswerRepoClearSolutionsOutput> {
    await this.client.answer.updateMany({
      where: {
        questionId: +questionId,
        isSolution: true,
      },
      data: {
        isSolution: false,
      },
    });
  }

  async voteUp (
    { answerId }: AnswerRepoVoteUpInput,
  ): Promise<AnswerRepoVoteUpOutput> {
    await this.client.answer.update({
      where: {
        id: +answerId,
      },
      data: {
        rating: {
          increment: 1,
        },
      },
    });
  }

  async voteDown (
    { answerId }: AnswerRepoVoteDownInput,
  ): Promise<AnswerRepoVoteDownOutput> {
    await this.client.answer.update({
      where: {
        id: +answerId,
      },
      data: {
        rating: {
          decrement: 1,
        },
      },
    });
  }
}