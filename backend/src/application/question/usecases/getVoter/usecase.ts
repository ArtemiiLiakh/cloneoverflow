import { QuestionVoteNotFound } from '@core/question/exceptions';
import { QuestionVoterRepository } from '@core/question/repository/QuestionVoterRepository';
import { QuestionGetVoterInput, QuestionGetVoterOutput } from './dto';
import { IQuestionGetVoterUseCase } from './type';

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
      throw new QuestionVoteNotFound();
    }

    return voter;
  }
}