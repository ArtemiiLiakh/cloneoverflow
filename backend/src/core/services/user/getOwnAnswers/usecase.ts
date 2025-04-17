import config from '@/config';
import { AnswerRepository } from '@core/repositories';
import { UserGetOwnAnswersInput, UserGetOwnAnswersOutput } from './dto';
import { IUserGetOwnAnswersUseCase } from './type';
import { AnswersSortByMapper } from '@core/services/utils/AnswersSortByMapper';
import { AnswersSortByEnum } from '@cloneoverflow/common';

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