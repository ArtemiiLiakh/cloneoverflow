import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { IAnswerUpdateUseCase } from './type';
import { AnswerUpdateInput, AnswerUpdateOutput } from './dto';

export class AnswerUpdateUseCase implements IAnswerUpdateUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  async execute (
    { answerId, text }: AnswerUpdateInput,
  ): Promise<AnswerUpdateOutput> {
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