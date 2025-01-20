import { AnswerUserStatusEnum } from '@cloneoverflow/common';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { AnswerGetInput, AnswerGetOutput } from './dto';
import { IAnswerGetUseCase } from './type';
import { getOutputMapper } from './mapper';

export class AnswerGetUseCase implements IAnswerGetUseCase {
  constructor (
    private answerRepository: AnswerRepository,
    private answerUserRepository: AnswerUserRepository,
  ) {}

  async execute (
    { executorId, answerId }: AnswerGetInput,
  ): Promise<AnswerGetOutput> {
    const answer =  await this.answerRepository.getAnswer({
      where: { answerId },
      include: {
        owner: true,
        question: true,
      },
    });
  
    let voter: AnswerUser | undefined;

    if (executorId) {
      voter = await this.answerUserRepository.getOne({
        where: {
          userId: executorId,
          status: AnswerUserStatusEnum.VOTER,
        },
      }) ?? undefined;
    }
  
    return getOutputMapper({ answer, voter });
  }
}