import { ForbiddenException, VoteTypeEnum } from '@cloneoverflow/common';
import { UserRatingActions } from '@common/enums/UserRatingActions';
import { Unit, UnitOfWork } from '@core/repositories';
import { AnswerRepository } from '@core/repositories/answer/AnswerRepository';
import { IUserRatingValidator } from '@core/services/validators/types';
import { AnswerVoteInput, AnswerVoteOutput } from './dto';
import { IAnswerVoteUseCase } from './type';

export class AnswerVoteUseCase implements IAnswerVoteUseCase {
  constructor (
    private userRatingValidator: IUserRatingValidator,
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, answerId, vote }: AnswerVoteInput,
  ): Promise<AnswerVoteOutput> {
    const answer = await this.answerRepository.getById({ 
      answerId,
      select: { ownerId: true },
    });
  
    if (answer.ownerId === executorId) {
      throw new ForbiddenException('You cannot vote your answer');
    }

    await this.userRatingValidator.validate({
      userId: executorId,
      action: vote === VoteTypeEnum.UP ? UserRatingActions.AnswerVoteUp : UserRatingActions.AnswerVoteDown,
    });
  
    await this.unitOfWork.executeFn(async (unit) => {
      const voter = await unit.answerVoterRepository.get({
        userId: executorId,
        answerId,
      });
    
      if (voter === null) {
        await unit.answerVoterRepository.create({
          answerId,
          userId: executorId,
          voteType: vote,
        });
      } else {
        if (voter && voter.voteType === vote) {
          throw new ForbiddenException('You cannot vote question more than one time');
        }
  
        await unit.answerVoterRepository.update({
          voterId: voter.id,
          voteType: voter.voteType === VoteTypeEnum.EMPTY ? vote : VoteTypeEnum.EMPTY,
        });
      }

      if (vote === VoteTypeEnum.UP) {
        await this.voteUp(unit, answerId, answer.ownerId);
      } else {
        await this.voteDown(unit, answerId, answer.ownerId);
      }
    });
  }

  private async voteUp (unit: Unit, answerId: string, ownerId: string | null): Promise<void> {
    await unit.answerRepository.voteUp({
      answerId,
    });

    if (ownerId) {
      await unit.userRepository.increaseRating({
        userId: ownerId,
      });
    }
  }

  private async voteDown (unit: Unit, answerId: string, ownerId: string | null): Promise<void> {
    await unit.answerRepository.voteDown({
      answerId,
    });

    if (ownerId) {
      await unit.userRepository.decreaseRating({
        userId: ownerId,
      });
    }
  }
}