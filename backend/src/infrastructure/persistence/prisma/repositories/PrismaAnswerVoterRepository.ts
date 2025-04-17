import { VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerVoter } from '@core/models/answer';
import { AnswerVoterRepository } from '@core/repositories';
import { AnswerVoterRepoCreateInput, AnswerVoterRepoCreateOutput } from '@core/repositories/answer/answerVoter/dtos/Create';
import { AnswerVoterRepoGetInput, AnswerVoterRepoGetOutput } from '@core/repositories/answer/answerVoter/dtos/Get';
import { AnswerVoterRepoUpdateInput, AnswerVoterRepoUpdateOutput } from '@core/repositories/answer/answerVoter/dtos/Update';
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