import { BadBodyException, ForbiddenException, NoEntityWithIdException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionCloseUseCase } from '../types/usecases';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionUser } from '@core/domain/entities/QuestionUser';

export class QuestionCloseUseCase implements IQuestionCloseUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, answerId }: QuestionServiceInput.CloseQuestion,
  ): Promise<QuestionServiceOutput.CloseQuestion> {
    const question = await this.questionRepository.getPartialById({ 
      questionId,
      select: {
        ownerId: true,
        isClosed: true,
      },
    });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
    
    if (question.ownerId !== executorId) {
      throw new ForbiddenException();
    }
    
    const answer = await this.answerRepository.getPartialById({ 
      answerId,
      select: { questionId: true, ownerId: true },
    });
    
    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }
    
    if (answer.questionId !== questionId) {
      throw new BadBodyException('Wrong answer id');
    }

    if (question.isClosed) {
      throw new BadBodyException('The question is already closed');
    }

    await this.unitOfWork.execute((unit) => [
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
    ]);
  }
}