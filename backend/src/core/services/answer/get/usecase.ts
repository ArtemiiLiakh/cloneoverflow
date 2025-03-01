import { AnswerRepository } from '@core/repositories/answer/AnswerRepository';
import { AnswerGetInput, AnswerGetOutput } from './dto';
import { getOutputMapper } from './mapper';
import { IAnswerGetUseCase } from './type';

export class AnswerGetUseCase implements IAnswerGetUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  async execute (
    { answerId }: AnswerGetInput,
  ): Promise<AnswerGetOutput> {
    const answer = await this.answerRepository.getAnswer({
      where: { answerId },
      include: {
        owner: true,
        question: true,
      },
    });
  
    return getOutputMapper(answer);
  }
}