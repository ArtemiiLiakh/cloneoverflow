import { AnswerUserStatusEnum, NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerGetUseCase } from '../types/usecases';

export class AnswerGetUseCase implements IAnswerGetUseCase {
  constructor (
    private answerRepository: AnswerRepository,
    private answerUserRepository: AnswerUserRepository,
  ) {}

  async execute (
    { executorId, answerId }: AnswerServiceInput.Get,
  ): Promise<AnswerServiceOutput.Get> {
    const answer =  await this.answerRepository.getAnswer({
      where: { answerId },
      include: {
        owner: true,
        question: true,
      },
    });
  
    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }

    const voter = await this.answerUserRepository.getOne({
      where: {
        userId: executorId,
        status: AnswerUserStatusEnum.VOTER,
      },
    });
  
    return {
      entity: answer.entity,
      owner: answer.owner!,
      question: answer.question!,
      userStats: voter ?? null,
    };
  }
}