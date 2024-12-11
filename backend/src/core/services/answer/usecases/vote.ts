import { AnswerUserStatusEnum, ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerVoteUseCase } from '../types/usecases';

export class AnswerVoteUseCase implements IAnswerVoteUseCase {
  constructor (
    private answerRepository: AnswerRepository,
    private answerUserRepository: AnswerUserRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, answerId, vote }: AnswerServiceInput.VoteAnswer,
  ): Promise<AnswerServiceOutput.VoteAnswer> {
    const answer = await this.answerRepository.getAnswer({
      where: { id: answerId },
      include: {
        owner: true,
      },
    });
  
    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }
  
    if (answer.entity.ownerId === executorId) {
      throw new ForbiddenException('You cannot vote your own answer');
    }
  
    const answerVoter = await this.answerUserRepository.getOne({
      where: {
        userId: executorId,
        answerId,
        status: AnswerUserStatusEnum.VOTER,
      },
    });
  
    if (answerVoter && answerVoter.voteType === vote) {
      throw new ForbiddenException();
    }
  
    await this.unitOfWork.execute(async (unit) => {
      if (!answerVoter) {
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
          where: { id: answerVoter.id },
          data: {
            voteType: answerVoter.voteType === null ? vote : null,
          },
        });
      }
  
      await unit.answerRepository.addRating({
        answerId,
        voteType: vote,
      });
    });
  }
}