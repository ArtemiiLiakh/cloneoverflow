import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerUpdateUseCase } from '../types/usecases';

export class AnswerUpdateUseCase implements IAnswerUpdateUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  async execute (
    { answerId, text }: AnswerServiceInput.Update,
  ): Promise<AnswerServiceOutput.Update> {
    await this.answerRepository.validateById({ answerId });

    return await this.answerRepository.update({ 
      answerId, 
      answer: {
        text,
      },
      returnEntity: true,
    }).then(answer => answer!);
  }
}