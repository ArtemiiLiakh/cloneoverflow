import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { AnswerGetInput, AnswerGetOutput } from './dto';
import { IAnswerGetUseCase } from './type';

export class AnswerGetUseCase implements IAnswerGetUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  execute (
    { answerId, executorId }: AnswerGetInput,
  ): Promise<AnswerGetOutput> {
    return this.answerRepository.getDetailedById({
      answerId,
      voterId: executorId,
    });
  }
}