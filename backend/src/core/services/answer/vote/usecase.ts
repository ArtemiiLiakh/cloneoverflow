import { AnswerUserStatusEnum, Exception, ForbiddenException } from '@cloneoverflow/common';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { UnitOfWork } from '@core/domain/repositories';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { AnswerVoteInput, AnswerVoteOutput } from './dto';
import { IAnswerVoteUseCase } from './type';

export class AnswerVoteUseCase implements IAnswerVoteUseCase {
  constructor (
    private answerRepository: AnswerRepository,
    private answerUserRepository: AnswerUserRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, answerId, vote }: AnswerVoteInput,
  ): Promise<AnswerVoteOutput> {
    const answer = await this.answerRepository.getPartialById({ 
      answerId,
      select: { ownerId: true },
    });
  
    if (answer.ownerId === executorId) {
      throw new ForbiddenException('You cannot vote your own answer');
    }
  
    const voter = await this.answerUserRepository.getOne({
      where: {
        userId: executorId,
        answerId,
        status: AnswerUserStatusEnum.VOTER,
      },
    });
  
    if (voter && voter.voteType === vote) {
      throw new ForbiddenException('You cannot vote question more than one time');
    }
  
    const result = await this.unitOfWork.execute(async (unit) => {
      if (!voter) {
        await unit.answerUserRepository.create({
          user: AnswerUser.new({
            userId: executorId,
            answerId,
            status: AnswerUserStatusEnum.VOTER,
            voteType: vote,
          }),
        });
      }
      else {
        await unit.answerUserRepository.update({
          answerUserId: voter.id,
          data: {
            voteType: voter.voteType === null ? vote : null,
          },
        });
      }
  
      await unit.answerRepository.addRating({
        answerId,
        voteType: vote,
      });

      return true;
    });

    if (!result) {
      throw new Exception('Voting answer failed');
    }
  }
}