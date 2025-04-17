import { NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository, QuestionRepository } from '@core/repositories';
import { AnswerCreateInput, AnswerCreateOutput } from './dto';
import { IAnswerCreateUseCase } from './type';

export class AnswerCreateUseCase implements IAnswerCreateUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
  ) {}
  
  async execute (
    { executorId, questionId, text }: AnswerCreateInput,
  ): Promise<AnswerCreateOutput> {
    if (!await this.questionRepository.isExist({ questionId })) {
      throw new NoEntityWithIdException('Question');
    }

    return this.answerRepository.create({ 
      ownerId: executorId,
      questionId,
      text,
    });
  }
}