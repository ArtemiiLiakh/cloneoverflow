import { ForbiddenException } from '@cloneoverflow/common';
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
    const question = await this.questionRepository.getById({ 
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
      throw new ForbiddenException('The question is already opened');
    }

    await this.unitOfWork.executeSeq((unit) => [
      unit.questionRepository.openQuestion({ questionId }),
      unit.answerRepository.clearSolution({ questionId }),
    ]);
  }
}