import config from '@/config';
import { AnswersSortByMapper } from '@application/answer/adapters/AnswersSortByMapper';
import { AnswersSortByEnum } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { UserGetOwnAnswersInput, UserGetOwnAnswersOutput } from './dto';
import { IUserGetOwnAnswersUseCase } from './type';

export class UserGetOwnAnswersUseCase implements IUserGetOwnAnswersUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  execute ({ userId, answerOptions }: UserGetOwnAnswersInput): Promise<UserGetOwnAnswersOutput> {
    return this.answerRepository.getOwnerAnswers({
      ownerId: userId,
      searchText: answerOptions?.searchText,
      orderBy: AnswersSortByMapper(
        answerOptions?.sortBy ?? AnswersSortByEnum.DATE, 
        answerOptions?.orderBy,
      ),
      pagination: answerOptions?.pagination ?? config.defaultPagination,
    });
  }
}