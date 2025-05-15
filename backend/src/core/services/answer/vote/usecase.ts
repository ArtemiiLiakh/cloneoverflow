import { AnswerUserStatusEnum, Exception, ForbiddenException, VoteTypeEnum } from '@cloneoverflow/common';
import { UserRatingActions } from '@common/enums/UserRatingActions';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { UnitOfWork } from '@core/domain/repositories';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { IUserRatingValidator } from '@core/services/validators/types';
import { AnswerVoteInput, AnswerVoteOutput } from './dto';
import { IAnswerVoteUseCase } from './type';

export class AnswerVoteUseCase implements IAnswerVoteUseCase {
  constructor (
    private userRatingValidator: IUserRatingValidator,
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
      throw new ForbiddenException('You cannot vote your answer');
    }

    await this.userRatingValidator.validate({
      userId: executorId,
      action: vote === VoteTypeEnum.UP ? UserRatingActions.AnswerVoteUp : UserRatingActions.AnswerVoteDown,
    });
  
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
  
    await this.unitOfWork.execute(async (unit) => {
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

      if (answer.ownerId) {
        await unit.userRepository.addRating({
          userId: answer.ownerId,
          voteType: vote,
        });
      }
    }).catch(() => {
      throw new Exception('Voting answer failed');
    });
  }
}