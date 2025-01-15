import { ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerUpdateUseCase } from '../types/usecases';

export class AnswerUpdateUseCase implements IAnswerUpdateUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  async execute (
    { executorId, answerId, text }: AnswerServiceInput.Update,
  ): Promise<AnswerServiceOutput.Update> {
    const answer = await this.answerRepository.getById({ answerId });

    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }

    if (answer.ownerId !== executorId) {
      throw new ForbiddenException();
    }
  
    await this.answerRepository.update({ 
      answerId, 
      answer: {
        text,
      },
    });

    answer.text = text;
    return answer;
  }
}