import { NotFoundException } from '@cloneoverflow/common';
import { AnswerVoterRepository } from '@core/repositories';
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
      throw new NotFoundException('Answer voter not found');
    }

    return voter;
  }
}