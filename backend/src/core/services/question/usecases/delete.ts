import { ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionDeleteUseCase } from '../types/usecases';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';

export class QuestionDeleteUseCase implements IQuestionDeleteUseCase {
  constructor (
    private validateUserUseCase: IValidateUserUseCase,
    private questionRepository: QuestionRepository,
  ) {}

  async execute (
    { executorId, questionId }: QuestionServiceInput.Delete,
  ): Promise<QuestionServiceOutput.Delete> {
    await this.validateUserUseCase.validate({
      userId: executorId,
    });

    const question = await this.questionRepository.findById({ id: questionId });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
  
    if (question.entity.ownerId !== executorId) {
      throw new ForbiddenException('You are not owner of this question');
    }
  
    await this.questionRepository.delete({
      question: question.entity,
    });
  
    return question.entity;
  }
}