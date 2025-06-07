import { AnswerVoteNotFound } from '@core/answer/exceptions/AnswerVoterNotFound';
import { AnswerVoterRepository } from '@core/answer/repository/AnswerVoterRepository';
import { AnswerGetVoterInput, AnswerGetVoterOutput } from './dto';
import { IAnswerGetVoterUseCase } from './type';

export class AnswerGetVoterUseCase implements IAnswerGetVoterUseCase {
  constructor (
    private answerVoterRepository: AnswerVoterRepository,
  ) {}

  async execute (
    { answerId, userId }: AnswerGetVoterInput,
  ): Promise<AnswerGetVoterOutput> {
    const voter = await this.answerVoterRepository.get({
      answerId,
      userId,
    });

    if (voter === null) {
      throw new AnswerVoteNotFound();
    }

    return voter;
  }
}