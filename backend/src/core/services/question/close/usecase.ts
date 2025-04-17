import { BadBodyException } from '@cloneoverflow/common';
import { UserRatingActions } from '@common/enums/UserRatingActions';
import { UnitOfWork } from '@core/repositories';
import { AnswerRepository } from '@core/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { IUserRatingValidator } from '@core/services/validators/types';
import { QuestionCloseInput, QuestionCloseOutput } from './dto';
import { IQuestionCloseUseCase } from './type';

export class QuestionCloseUseCase implements IQuestionCloseUseCase {
  constructor (
    private userRatingValidator: IUserRatingValidator,
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, answerId }: QuestionCloseInput,
  ): Promise<QuestionCloseOutput> {
    const question = await this.questionRepository.getById({ 
      questionId,
    });

    if (question.ownerId !== executorId) {
      await this.userRatingValidator.validate({
        userId: executorId,
        action: UserRatingActions.QuestionClose,
      });
    }

    if (question.isClosed) {
      throw new BadBodyException('The question is already closed');
    }
    
    const answer = await this.answerRepository.getById({ 
      answerId,
      select: { questionId: true },
    });
    
    if (answer.questionId !== question.questionId) {
      throw new BadBodyException('Wrong answer id');
    }

    await this.unitOfWork.executeSeq((unit) => [
      unit.questionRepository.closeQuestion({
        questionId,
      }),
      unit.answerRepository.setAsSolution({
        answerId,
      }),
    ]);
  }
}