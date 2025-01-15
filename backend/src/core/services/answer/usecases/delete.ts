import { ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerDeleteUseCase } from '../types/usecases';

export class AnswerDeleteUseCase implements IAnswerDeleteUseCase {
  constructor (
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, answerId }: AnswerServiceInput.Delete,
  ): Promise<AnswerServiceOutput.Delete> {
    const answer = await this.answerRepository.getById({ answerId });
  
    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }

    if (answer.ownerId !== executorId) {
      throw new ForbiddenException('You cannot delete someone else\'s question');
    }
  
    await this.unitOfWork.execute(async (unit) => {
      if (answer.isSolution) {
        await unit.questionRepository.openQuestion({
          questionId: answer.questionId,
        });
      }
  
      await unit.answerRepository.delete({ answerId });
    });
  
    return answer;
  }
}