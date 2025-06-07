import config from '@/config';
import { QuestionsSortByMapper } from '@application/question/adapters/QuestionsSortByMapper';
import { QuestionsSortByEnum } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { UserGetOwnQuestionsInput, UserGetOwnQuestionsOutput } from './dto';
import { IUserGetOwnQuestionsUseCase } from './type';

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