import { BadBodyException, ForbiddenException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionCloseUseCase } from '../types/usecases';

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
        isClosed: true,
      },
    });

    if (question.ownerId !== executorId) {
      throw new ForbiddenException('You are not owner of the question');
    }

    if (question.isClosed) {
      throw new BadBodyException('The question is already closed');
    }
    
    const answer = await this.answerRepository.getPartialById({ 
      answerId,
      select: { questionId: true },
    });
    
    if (answer.questionId !== questionId) {
      throw new BadBodyException('Wrong answer id');
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