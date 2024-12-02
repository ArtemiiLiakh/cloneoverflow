import { ForbiddenException, NoEntityWithIdException, AnswerUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerUserStats } from '@core/domain/entities/AnswerUserStats';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerServiceInput } from '../dto/AnswerServiceInput';
import { AnswerServiceOutput } from '../dto/AnswerServiceOutput';
import { IAnswerVoteUseCase } from '../types/usecases';

export class AnswerVoteUseCase implements IAnswerVoteUseCase {
  constructor (
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, answerId, vote }: AnswerServiceInput.VoteAnswer,
  ): Promise<AnswerServiceOutput.VoteAnswer> {
    const answer = await this.answerRepository.findById({
      id: answerId,
      options: {
        include: {
          users: {
            userId: executorId,
            answerId,
            status: AnswerUserStatusEnum.VOTER,
          },
          owner: true,
        },
      },
    });
  
    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }
  
    if (answer.entity.ownerId === executorId) {
      throw new ForbiddenException('You cannot vote your own answer');
    }
  
    const answerVoter = answer.users?.[0];
  
    if (answerVoter && answerVoter.voteType === vote) {
      throw new ForbiddenException();
    }
  
    const newAnswerRate = answer.entity.rate + (vote === VoteTypeEnum.UP ? 1 : -1);
    const newAnswerOwnerRate = answer.owner!.reputation + (vote === VoteTypeEnum.UP ? 1 : -1);
    
    await this.unitOfWork.execute(async (unit) => {
      if (!answerVoter) {
        await unit.answerUserRepository.create({
          user: AnswerUserStats.new({
            userId: executorId,
            answerId,
            status: AnswerUserStatusEnum.VOTER,
            voteType: vote,
          }),
        });
      }
      else {
        await unit.answerUserRepository.update({
          where: {
            id: answerVoter.id,
          },
          data: {
            voteType: answerVoter.voteType === null ? vote : null,
          },
        });
      }
  
      await unit.answerRepository.update({
        id: answerId,
        answer: {
          rate: newAnswerRate,
        },
      });
  
      await unit.userRepository.update({
        id: answer.entity.ownerId,
        user: {
          reputation: newAnswerOwnerRate,
        },
      });
    });
  }
}