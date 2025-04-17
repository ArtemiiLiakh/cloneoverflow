import config from '@/config';
import { QuestionRepository } from '@core/repositories';
import { UserGetOwnQuestionsInput, UserGetOwnQuestionsOutput } from './dto';
import { IUserGetOwnQuestionsUseCase } from './type';
import { QuestionsSortByMapper } from '@core/services/utils/QuestionsSortByMapper';
import { QuestionsSortByEnum } from '@cloneoverflow/common';

export class UserGetOwnQuestionsUseCase implements IUserGetOwnQuestionsUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  execute ({ userId, questionOptions }: UserGetOwnQuestionsInput): Promise<UserGetOwnQuestionsOutput> {
    return this.questionRepository.getOwnerQuestions({
      ownerId: userId,
      searchText: questionOptions?.searchText,
      tags: questionOptions?.tags,
      orderBy: QuestionsSortByMapper(
        questionOptions?.sortBy ?? QuestionsSortByEnum.DATE, 
        questionOptions?.orderBy,
      ),
      pagination: questionOptions?.pagination ?? config.defaultPagination,
    });
  }
}