import { QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionGetVoteInput, QuestionGetVoteOutput } from './dto';
import { IQuestionGetVoteUseCase } from './type';
import { QuestionUserRepository } from '@core/repositories';

export class QuestionGetVoteUseCase implements IQuestionGetVoteUseCase {
  constructor (
    private questionUserRepository: QuestionUserRepository,
  ) {}

  execute ({ voterId, questionId }: QuestionGetVoteInput): Promise<QuestionGetVoteOutput> {
    return this.questionUserRepository.getOne({
      where: {
        questionId,
        userId: voterId,
        status: QuestionUserStatusEnum.VOTER,
      },
    });
  }
}