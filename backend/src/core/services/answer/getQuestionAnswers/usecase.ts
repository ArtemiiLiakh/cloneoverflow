import { AnswerRepository } from '@core/repositories';
import { AnswerGetByQuestionInput, AnswerGetByQuestionOutput } from './dto';
import { IAnswerGetByQuestionUseCase } from './type';
import { AnswersSortByMapper } from '@core/services/utils/AnswersSortByMapper';
import { AnswersSortByEnum } from '@cloneoverflow/common';

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