import { AnswerUserStatusEnum } from '@cloneoverflow/common';
import { AnswerUserRepository } from '@core/domain/repositories';
import { AnswerGetVoterInput, AnswerGetVoterOutput } from './dto';
import { IAnswerGetVoterUseCase } from './type';

export class AnswerGetVoterUseCase implements IAnswerGetVoterUseCase {
  constructor (
    private answerUserRepository: AnswerUserRepository,
  ) {}

  async execute (
    { answerId, userId }: AnswerGetVoterInput,
  ): Promise<AnswerGetVoterOutput> {
    return this.answerUserRepository.getOne({
      where: {
        answerId,
        userId,
        status: AnswerUserStatusEnum.VOTER,
      },
    });
  }
}