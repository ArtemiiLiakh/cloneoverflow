import { NoEntityWithIdException, AnswerUserStatusEnum } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerServiceInput } from '../dto/AnswerServiceInput';
import { AnswerServiceOutput } from '../dto/AnswerServiceOutput';
import { IAnswerGetUseCase } from '../types/usecases';

export class AnswerGetUseCase implements IAnswerGetUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  async execute (
    { executorId, answerId }: AnswerServiceInput.Get,
  ): Promise<AnswerServiceOutput.Get> {
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