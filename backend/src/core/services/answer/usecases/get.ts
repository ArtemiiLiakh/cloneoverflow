import { NoEntityWithIdException, AnswerUserStatusEnum } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerGetUseCase } from '../types/usecases';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';

export class AnswerGetUseCase implements IAnswerGetUseCase {
  constructor (
    private validateUserUseCase: IValidateUserUseCase,
    private answerRepository: AnswerRepository,
  ) {}

  async execute (
    { executorId, answerId }: AnswerServiceInput.Get,
  ): Promise<AnswerServiceOutput.Get> {
    if (executorId) {
      await this.validateUserUseCase.validate({ userId: executorId });
    }

    const answer =  await this.answerRepository.findById({ 
      id: answerId,
      options: {
        include: {
          owner: true,
          question: true,
          users: {
            userId: executorId,
            status: AnswerUserStatusEnum.VOTER,
          },
        },
      },
    });
  
    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }
  
    return {
      entity: answer.entity,
      owner: answer.owner,
      question: answer.question,
      userStats: answer.users?.[0],
    };
  }
}