import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionDeleteInput, QuestionDeleteOutput } from './dto';
import { IQuestionDeleteUseCase } from './type';
import { ForbiddenException } from '@cloneoverflow/common';

export class QuestionDeleteUseCase implements IQuestionDeleteUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute (
    { executorId, questionId }: QuestionDeleteInput,
  ): Promise<QuestionDeleteOutput> {
    const question = await this.questionRepository.getById({ questionId });

    if (question.ownerId !== executorId) {
      throw new ForbiddenException('You can delete only your questions');
    }

    await this.questionRepository.delete({ questionId });
  
    return question;
  }
}