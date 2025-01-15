import { AnswerUserStatusEnum, NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerGetUseCase } from '../types/usecases';
import { AnswerUser } from '@core/domain/entities/AnswerUser';

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

    let voter: AnswerUser | undefined;

    if (executorId) {
      voter = await this.answerUserRepository.getOne({
        where: {
          userId: executorId,
          status: AnswerUserStatusEnum.VOTER,
        },
      }) ?? undefined;
    }
  
    return {
      entity: answer.entity,
      owner: {
        id: answer.owner!.id,
        name: answer.owner!.name,
        username: answer.owner!.username,
        rating: answer.owner!.rating,
      },
      question: {
        id: answer.question!.id,
        ownerId: answer.question!.ownerId,
        title: answer.question!.title,
        rating: answer.question!.rating,
        isClosed: answer.question!.isClosed,
      },
      voter,
    };
  }
}