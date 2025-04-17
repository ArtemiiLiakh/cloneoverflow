import { QuestionVoterRepository } from '@core/repositories';
import { QuestionGetVoterInput, QuestionGetVoterOutput } from './dto';
import { IQuestionGetVoterUseCase } from './type';
import { NoEntityWithIdException } from '@cloneoverflow/common';

export class QuestionGetVoterUseCase implements IQuestionGetVoterUseCase {
  constructor (
    private questionVoterRepository: QuestionVoterRepository,
  ) {}

  async execute ({ voterId, questionId }: QuestionGetVoterInput): Promise<QuestionGetVoterOutput> {
    const voter = await this.questionVoterRepository.get({
      questionId,
      userId: voterId,
    });

    if (!voter) {
      throw new NoEntityWithIdException('Question voter');
    }

    return voter;
  }
}