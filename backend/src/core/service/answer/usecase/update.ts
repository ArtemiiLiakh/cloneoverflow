import { NoEntityWithIdException, ForbiddenException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerServiceInput } from '../dto/AnswerServiceInput';
import { AnswerServiceOutput } from '../dto/AnswerServiceOutput';
import { IAnswerUpdateUseCase } from '../types/usecases';

export class AnswerUpdateUseCase implements IAnswerUpdateUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  async execute (
    { executorId, answerId, text }: AnswerServiceInput.Update,
  ): Promise<AnswerServiceOutput.Update> {
    const answer = await this.answerRepository.findById({
      id: answerId,
    });

    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }

    if (answer.entity.ownerId !== executorId) {
      throw new ForbiddenException();
    }
  
    return this.answerRepository.update({ 
      id: answerId, 
      answer: {
        text,
      },
      returnEntity: true,
    }).then(answer => answer!);
  }
}