import { NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { IValidateAnswerUseCase } from '../types/usecases';

export class ValidateAnswerUseCase implements IValidateAnswerUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  async validate ({ answerId }: { answerId: string }) {
    const answer = await this.answerRepository.findById({ 
      id: answerId,
      options: {
        select: { id: true },
      },
    });
    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }
  }
}