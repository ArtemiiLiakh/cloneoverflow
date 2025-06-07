import { IUserRatingValidator } from '@application/validators/types';
import { VoteTypeEnum } from '@cloneoverflow/common';
import { UserRatingActions } from '@common/enums/UserRatingActions';
import { Unit, UnitOfWork } from '@common/repository/UnitOfWork';
import { CannotVoteOwnQuestion, CannotVoteQuestionTwice } from '@core/question/exceptions';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { QuestionVoteInput, QuestionVoteOutput } from './dto';
import { IQuestionVoteUseCase } from './type';

export class QuestionVoteUseCase implements IQuestionVoteUseCase {
  constructor (
    private userRatingValidator: IUserRatingValidator,
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, vote }: QuestionVoteInput,
  ): Promise<QuestionVoteOutput> {
    const question = await this.questionRepository.getById({ 
      questionId,
      select: { ownerId: true },
    });
    
    if (question.ownerId === executorId) {
      throw new CannotVoteOwnQuestion();
    }

    await this.userRatingValidator.validate({
      userId: executorId,
      action: vote === VoteTypeEnum.UP ? UserRatingActions.QuestionVoteUp : UserRatingActions.QuestionVoteDown,
    });

    await this.unitOfWork.executeFn(async (unit) => {
      const voter = await unit.questionVoterRepository.get({
        questionId, 
        userId: executorId,
      });    

      if (!voter) {
        await unit.questionVoterRepository.create({
          questionId,
          userId: executorId,
          voteType: vote,
        });
      } else {
        if (voter.voteType === vote) {
          throw new CannotVoteQuestionTwice();
        }

        await unit.questionVoterRepository.update({
          voterId: voter.id,
          voteType: voter.voteType === VoteTypeEnum.EMPTY ? vote : VoteTypeEnum.EMPTY,
        });
      }

      if (vote === VoteTypeEnum.UP) {
        await this.voteUp(unit, questionId, question.ownerId);
      } else {
        await this.voteDown(unit, questionId, question.ownerId);
      }
    });
  }

  private async voteUp (
    unit: Unit, 
    questionId: string, 
    ownerId: string | null,
  ): Promise<void> {
    await unit.questionRepository.voteUp({
      questionId,
    });
    if (ownerId) {
      await unit.userRepository.increaseRating({
        userId: ownerId,
      });
    }
  }

  private async voteDown (
    unit: Unit, 
    questionId: string, 
    ownerId: string | null,
  ): Promise<void> {
    await unit.questionRepository.voteDown({
      questionId,
    });
    if (ownerId) {
      await unit.userRepository.decreaseRating({
        userId: ownerId,
      });
    }
  }
}