import { NoEntityWithIdException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { ValidationServiceInput } from '../dtos/ValidationServiceInput';
import { IValidateQuestionUseCase } from '../types/usecases';

export class ValidateQuestionUseCase implements IValidateQuestionUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}
  
  async execute ({ questionId }: ValidationServiceInput.ValidateQuestion): Promise<void> {
    if (!await this.questionRepository.isExist({ questionId })) {
      throw new NoEntityWithIdException('Question');
    }
  }
}