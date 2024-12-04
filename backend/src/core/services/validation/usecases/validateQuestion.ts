import { NoEntityWithIdException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { IValidateQuestionUseCase } from '../types/usecases';

export class ValidateQuestionUseCase implements IValidateQuestionUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async validate ({ questionId }: { questionId: string }) {
    const question = await this.questionRepository.findById({ 
      id: questionId,
      options: {
        select: { id: true },
      },
    });
    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
  }
}