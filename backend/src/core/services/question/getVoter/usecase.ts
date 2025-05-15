import { QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionGetVoterInput, QuestionGetVoterOutput } from './dto';
import { IQuestionGetVoterUseCase } from './type';
import { QuestionUserRepository } from '@core/domain/repositories';

export class QuestionGetVoterUseCase implements IQuestionGetVoterUseCase {
  constructor (
    private questionUserRepository: QuestionUserRepository,
  ) {}

  execute ({ voterId, questionId }: QuestionGetVoterInput): Promise<QuestionGetVoterOutput> {
    return this.questionUserRepository.getOne({
      where: {
        questionId,
        userId: voterId,
        status: QuestionUserStatusEnum.VOTER,
      },
    });
  }
}