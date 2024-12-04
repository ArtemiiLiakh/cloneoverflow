import { ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerDeleteUseCase } from '../types/usecases';

export class AnswerDeleteUseCase implements IAnswerDeleteUseCase {
  constructor (
    private validateUserUseCase: IValidateUserUseCase,
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, answerId }: AnswerServiceInput.Delete,
  ): Promise<AnswerServiceOutput.Delete> {
    await this.validateUserUseCase.validate({ userId: executorId });

    const answer = await this.answerRepository.findById({ id: answerId });
  
    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }

    if (answer.entity.ownerId !== executorId) {
      throw new ForbiddenException('You cannot delete someone else\'s question');
    }
  
    await this.unitOfWork.execute(async (unit) => {
      if (answer.entity.isSolution) {
        await unit.questionRepository.update({
          id: answer.entity.questionId,
          question: {
            isClosed: false,
          },
        });
      }
  
      await unit.answerRepository.delete({
        answer: answer.entity,
      });
    });
  
    return answer.entity;
  }
}