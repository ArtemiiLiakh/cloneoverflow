import { BadBodyException, Exception, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { UserRatingActions } from '@common/enums/UserRatingActions';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { UnitOfWork } from '@core/domain/repositories';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
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
    const question = await this.questionRepository.getPartialById({ 
      questionId,
      select: {
        id: true,
        ownerId: true,
        isClosed: true,
      },
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
    
    const answer = await this.answerRepository.getPartialById({ 
      answerId,
      select: { questionId: true },
    });
    
    if (answer.questionId !== question.id) {
      throw new BadBodyException('Wrong answer id');
    }

    await this.unitOfWork.executeAll((unit) => [
      unit.questionRepository.closeQuestion({
        questionId,
        answerId,
      }),

      unit.questionUserRepository.create({
        user: QuestionUser.new({
          questionId,
          userId: executorId,
          status: QuestionUserStatusEnum.ANSWERER,
        }),
      }),
    ]).catch(() => {
      throw new Exception('Closing quetion failed');
    });
  }
}