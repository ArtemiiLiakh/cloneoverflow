import { ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerUpdateUseCase } from '../types/usecases';

export class AnswerUpdateUseCase implements IAnswerUpdateUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  async execute (
    { executorId, answerId, text }: AnswerServiceInput.Update,
  ): Promise<AnswerServiceOutput.Update> {
    const answer = await this.answerRepository.getPartialById({ 
      answerId,
      select: {
        ownerId: true,
      },
    });

    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }

    if (answer.ownerId !== executorId) {
      throw new ForbiddenException();
    }
  
    return this.answerRepository.update({ 
      answerId, 
      answer: {
        text,
      },
      returnEntity: true,
    }).then(answer => answer!);
  }
}