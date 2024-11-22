import { ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionServiceInput } from '../dto/QuestionServiceInput';
import { QuestionServiceOutput } from '../dto/QuestionServiceOutput';
import { IQuestionDeleteUseCase } from '../types/usecases';

export class QuestionDeleteUseCase implements IQuestionDeleteUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute (
    { executorId, questionId }: QuestionServiceInput.Delete,
  ): Promise<QuestionServiceOutput.Delete> {
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