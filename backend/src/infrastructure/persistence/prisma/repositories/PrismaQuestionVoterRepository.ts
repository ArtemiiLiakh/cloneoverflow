import { VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionVoter } from '@core/models/question';
import { QuestionVoterRepository } from '@core/repositories';
import { QuestionVoterRepoCreateInput, QuestionVoterRepoCreateOutput } from '@core/repositories/question/questionVoter/dtos/Create';
import { QuestionVoterRepoGetInput, QuestionVoterRepoGetOutput } from '@core/repositories/question/questionVoter/dtos/Get';
import { QuestionVoterRepoUpdateInput, QuestionVoterRepoUpdateOutput } from '@core/repositories/question/questionVoter/dtos/Update';
import { PrismaClient } from '@prisma/client';

export class PrismaQuestionVoterRepository implements QuestionVoterRepository {
  constructor (
    private client: PrismaClient,
  ) {}
  
  async create (
    { questionId, userId, voteType }: QuestionVoterRepoCreateInput,
  ): Promise<QuestionVoterRepoCreateOutput> {
    const voter = await this.client.questionVoter.create({
      data: {
        questionId: +questionId,
        userId,
        voteType,
      },
    });

    return QuestionVoter.new({
      id: voter.id.toString(),
      questionId: voter.questionId.toString(),
      userId: voter.userId,
      voteType: voter.voteType as VoteTypeEnum,
    });
  }

  async get (
    { questionId, userId }: QuestionVoterRepoGetInput,
  ): Promise<QuestionVoterRepoGetOutput> {
    const voter = await this.client.questionVoter.findFirst({
      where: {
        questionId: +questionId,
        userId,
      },
    });

    if (!voter) {
      return null;
    }

    return QuestionVoter.new({
      id: voter.id.toString(),
      questionId: voter.questionId.toString(),
      userId: voter.userId,
      voteType: voter.voteType as VoteTypeEnum,
    });
  }
  
  async update (
    { voterId, voteType }: QuestionVoterRepoUpdateInput,
  ): Promise<QuestionVoterRepoUpdateOutput> {
    await this.client.questionVoter.update({
      where: {
        id: +voterId,
      },
      data: {
        voteType,
      },
    });
  }
}