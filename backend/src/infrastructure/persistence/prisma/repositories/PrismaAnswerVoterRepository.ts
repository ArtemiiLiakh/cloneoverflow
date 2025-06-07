import { VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerVoter } from '@core/answer';
import { AnswerVoterRepository } from '@core/answer/repository/AnswerVoterRepository';
import { AnswerVoterRepoCreateInput, AnswerVoterRepoCreateOutput } from '@core/answer/repository/dtos/answerVoter/Create';
import { AnswerVoterRepoGetInput, AnswerVoterRepoGetOutput } from '@core/answer/repository/dtos/answerVoter/Get';
import { AnswerVoterRepoUpdateInput, AnswerVoterRepoUpdateOutput } from '@core/answer/repository/dtos/answerVoter/Update';
import { PrismaClient } from '@prisma/client';

export class PrismaAnswerVoterRepository implements AnswerVoterRepository {
  constructor (
    private client: PrismaClient,
  ) {}
  
  async create (
    { answerId, userId, voteType }: AnswerVoterRepoCreateInput,
  ): Promise<AnswerVoterRepoCreateOutput> {
    const voter = await this.client.answerVoter.create({
      data: {
        answerId: +answerId,
        userId,
        voteType,
      },
    });

    return AnswerVoter.new({
      id: voter.id.toString(),
      answerId: voter.answerId.toString(),
      userId: voter.userId,
      voteType: voter.voteType as VoteTypeEnum,
    });
  }

  async get (
    { answerId, userId }: AnswerVoterRepoGetInput,
  ): Promise<AnswerVoterRepoGetOutput> {
    const voter = await this.client.answerVoter.findFirst({
      where: {
        answerId: +answerId,
        userId,
      },
    });

    if (!voter) return null;

    return AnswerVoter.new({
      id: voter.id.toString(),
      answerId: voter.answerId.toString(),
      userId: voter.userId,
      voteType: voter.voteType as VoteTypeEnum,
    });
  }

  async update (
    { voterId, voteType }: AnswerVoterRepoUpdateInput,
  ): Promise<AnswerVoterRepoUpdateOutput> {
    await this.client.answerVoter.update({
      where: {
        id: +voterId,
      },
      data: {
        voteType,
      },
    });
  }
}