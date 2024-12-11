import { ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionDeleteUseCase } from '../types/usecases';

export class QuestionDeleteUseCase implements IQuestionDeleteUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute (
    { executorId, questionId }: QuestionServiceInput.Delete,
  ): Promise<QuestionServiceOutput.Delete> {
    const question = await this.questionRepository.getById({ questionId });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
  
    if (question.ownerId !== executorId) {
      throw new ForbiddenException('You are not owner of this question');
    }
  
    await this.questionRepository.delete({
      questionId,
    });
  
    return question;
  }
}