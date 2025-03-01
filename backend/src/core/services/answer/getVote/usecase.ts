import { AnswerUserStatusEnum } from '@cloneoverflow/common';
import { AnswerUserRepository } from '@core/repositories';
import { AnswerGetVoteInput, AnswerGetVoteOutput } from './dto';
import { IAnswerGetVoteUseCase } from './type';

export class AnswerGetVoteUseCase implements IAnswerGetVoteUseCase {
  constructor (
    private answerUserRepository: AnswerUserRepository,
  ) {}

  async execute (
    { answerId, userId }: AnswerGetVoteInput,
  ): Promise<AnswerGetVoteOutput> {
    return this.answerUserRepository.getOne({
      where: {
        answerId,
        userId,
        status: AnswerUserStatusEnum.VOTER,
      },
    });
  }
}