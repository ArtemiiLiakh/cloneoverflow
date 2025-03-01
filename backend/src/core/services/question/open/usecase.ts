import { BadBodyException, Exception, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { UserRatingActions } from '@common/enums/UserRatingActions';
import { QuestionRepository, UnitOfWork } from '@core/repositories';
import { IUserRatingValidator } from '@core/services/validators/types';
import { QuestionOpenInput, QuestionOpenOutput } from './dto';
import { IQuestionOpenUseCase } from './type';

export class QuestionOpenUseCase implements IQuestionOpenUseCase {
  constructor (
    private userRatingValidator: IUserRatingValidator,
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId }: QuestionOpenInput,
  ): Promise<QuestionOpenOutput> {
    const question = await this.questionRepository.getPartialById({ 
      questionId,
      select: {
        ownerId: true,
        isClosed: true,
      },
    });

    if (executorId !== question.ownerId) {
      await this.userRatingValidator.validate({
        userId: executorId,
        action: UserRatingActions.QuestionOpen,
      });
    }

    if (!question.isClosed) {
      throw new BadBodyException('The question is already opened');
    }

    await this.unitOfWork.execute(async (unit) => {
      const questionAnswerer = await unit.questionUserRepository.getOne({
        where: {
          questionId,
          status: QuestionUserStatusEnum.ANSWERER,
        },
      });

      if (questionAnswerer) {
        await unit.questionUserRepository.delete({
          questionUserId: questionAnswerer.id,
        });
      }

      await unit.questionRepository.openQuestion({ questionId });
    }).catch(() => {
      throw new Exception('Question opening failed');
    });
  }
}