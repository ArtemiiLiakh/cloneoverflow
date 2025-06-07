import { AnswersSortByMapper } from '@application/answer/adapters/AnswersSortByMapper';
import { AnswersSortByEnum } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { AnswerGetByQuestionInput, AnswerGetByQuestionOutput } from './dto';
import { IAnswerGetByQuestionUseCase } from './type';

export class AnswerGetByQuestionUseCase implements IAnswerGetByQuestionUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}
  
  execute (
    { questionId, voterId, sortBy, orderBy, pagination }: AnswerGetByQuestionInput,
  ): Promise<AnswerGetByQuestionOutput> {
    return this.answerRepository.getByQuestionId({
      questionId,
      voterId,
      orderBy: AnswersSortByMapper(sortBy ?? AnswersSortByEnum.RATE, orderBy),
      pagination,
    });
  }
}