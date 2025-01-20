import { ForbiddenException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionDeleteInput, QuestionDeleteOutput } from './dto';
import { IQuestionDeleteUseCase } from './type';

export class QuestionDeleteUseCase implements IQuestionDeleteUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute (
    { executorId, questionId }: QuestionDeleteInput,
  ): Promise<QuestionDeleteOutput> {
    const question = await this.questionRepository.getById({ questionId });

    if (question.ownerId !== executorId) {
      throw new ForbiddenException('You are not owner of the question');
    }

    await this.questionRepository.delete({ questionId });
  
    return question;
  }
}