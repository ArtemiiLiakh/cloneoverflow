import { ForbiddenException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerUpdateUseCase } from '../types/usecases';

export class AnswerUpdateUseCase implements IAnswerUpdateUseCase {
  constructor (
    private validateUserUseCase: IValidateUserUseCase,
    private answerRepository: AnswerRepository,
  ) {}

  async execute (
    { executorId, answerId, text }: AnswerServiceInput.Update,
  ): Promise<AnswerServiceOutput.Update> {
    await this.validateUserUseCase.validate({ 
      userId: executorId,
    });

    const answer = await this.answerRepository.findById({ id: answerId });

    if (answer?.entity.ownerId !== executorId) {
      throw new ForbiddenException();
    }
  
    return this.answerRepository.update({ 
      id: answerId, 
      answer: {
        text,
      },
      returnEntity: true,
    }).then(answer => answer!);
  }
}