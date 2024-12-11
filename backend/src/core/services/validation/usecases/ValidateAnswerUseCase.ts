import { NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { ValidationServiceInput } from '../dtos/ValidationServiceInput';
import { IValidateAnswerUseCase } from '../types/usecases';

export class ValidateAnswerUseCase implements IValidateAnswerUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}
  
  async execute ({ answerId }: ValidationServiceInput.ValidateAnswer): Promise<void> {
    if (!await this.answerRepository.isExist({ answerId })) {
      throw new NoEntityWithIdException('Answer');
    }
  }
}