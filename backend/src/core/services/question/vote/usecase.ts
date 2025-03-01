import { Exception, ForbiddenException, QuestionUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { UserRatingActions } from '@common/enums/UserRatingActions';
import { QuestionUser } from '@core/models/QuestionUser';
import { QuestionRepository, QuestionUserRepository, UnitOfWork } from '@core/repositories';
import { IUserRatingValidator } from '@core/services/validators/types';
import { QuestionVoteInput, QuestionVoteOutput } from './dto';
import { IQuestionVoteUseCase } from './type';

export class QuestionVoteUseCase implements IQuestionVoteUseCase {
  constructor (
    private userRatingValidator: IUserRatingValidator,
    private questionRepository: QuestionRepository,
    private questionUserRepository: QuestionUserRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, vote }: QuestionVoteInput,
  ): Promise<QuestionVoteOutput> {
    const question = await this.questionRepository.getPartialById({ 
      questionId,
      select: { ownerId: true },
    });
    
    if (question.ownerId === executorId) {
      throw new ForbiddenException('You cannot vote your own question');
    }

    await this.userRatingValidator.validate({
      userId: executorId,
      action: vote === VoteTypeEnum.UP ? UserRatingActions.QuestionVoteUp : UserRatingActions.QuestionVoteDown,
    });

    const questionVoter = await this.questionUserRepository.getOne({
      where: {
        questionId, 
        userId: executorId,
        status: QuestionUserStatusEnum.VOTER, 
      },
    });
  
    if (questionVoter?.voteType === vote) {
      throw new ForbiddenException('You cannot vote question more than one time');
    }
  
    await this.unitOfWork.execute(async (unit) => {
      if (!questionVoter) {
        await unit.questionUserRepository.create({
          user: QuestionUser.new({
            userId: executorId,
            questionId,
            status: QuestionUserStatusEnum.VOTER,
            voteType: vote,
          }),
        });
      }
      else {
        await unit.questionUserRepository.update({
          questionUserId: questionVoter.id,
          data: {
            voteType: questionVoter.voteType === null ? vote : null,
          },
        });
      }
  
      await unit.questionRepository.addRating({
        questionId,
        voteType: vote,
      });

      if (question.ownerId) {
        await unit.userRepository.addRating({
          userId: question.ownerId,
          voteType: vote,
        });
      }
    }).catch(() => {
      throw new Exception('Question voting failed');
    });
  }
}