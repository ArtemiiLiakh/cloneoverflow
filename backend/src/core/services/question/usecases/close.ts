import { BadBodyException, ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionCloseUseCase } from '../types/usecases';

export class QuestionCloseUseCase implements IQuestionCloseUseCase {
  constructor (
    private validateUserUseCase: IValidateUserUseCase,
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, answerId }: QuestionServiceInput.CloseQuestion,
  ): Promise<QuestionServiceOutput.CloseQuestion> {
    await this.validateUserUseCase.validate({ userId: executorId });

    const question = await this.questionRepository.findById({ id: questionId });
    
    if (!question) {
      throw new NoEntityWithIdException('Question');
    }

    if (question.entity.ownerId !== executorId) {
      throw new ForbiddenException();
    }

    const answer = await this.answerRepository.findById({ id: answerId });

    if (answer?.entity.questionId !== questionId) {
      throw new BadBodyException('Wrong answer id');
    }

    await this.unitOfWork.execute(async (unit) => {
      await unit.questionRepository.update({
        id: questionId,
        question: {
          isClosed: !question.entity.isClosed,
        },
      });

      await unit.answerRepository.updateMany({
        where: {
          questionId,
        },
        answer: {
          isSolution: false,
        },
      });

      await unit.answerRepository.update({
        id: answerId,
        answer: {
          isSolution: !answer.entity.isSolution,
        },
      });
    });
  }
}