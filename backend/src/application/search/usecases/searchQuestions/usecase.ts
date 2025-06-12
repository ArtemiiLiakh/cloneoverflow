import config from '@/config';
import { FavoriteUnavailableForUnauthorized } from '@application/search/exceptions/FavoriteUnavailableForUnauthorized';
import { SearchQuestionFilterByEnum, SearchQuestionSortByEnum } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { SearchQuestionOrderByMapper } from '../../utils/SearchQuestionOrderByMapper';
import { SearchQuestionsInput, SearchQuestionsOutput } from './dto';
import { searchQuestionsOutputMapper } from './mapper';
import { ISearchQuestionsUseCase } from './type';
import { SearchQuestionFilterMapper } from './utils/SearchQuestionFilterByMapper';
import { SearchQuestionParse } from './utils/SearchQuestionParse';

export class SearchQuestionsUseCase implements ISearchQuestionsUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute (
    { executorId, filterBy, search, sortBy, orderBy, pagination }: SearchQuestionsInput,
  ): Promise<SearchQuestionsOutput> {
    const textFilter = SearchQuestionParse(search);
    
    if (filterBy === SearchQuestionFilterByEnum.FAVORITE && !executorId) {
      throw new FavoriteUnavailableForUnauthorized();;
    }

    const filter = filterBy ? SearchQuestionFilterMapper(filterBy, executorId) : {};

    const questions = await this.questionRepository.search({
      where: {
        ...textFilter,
        ...filter,
      },
      orderBy: SearchQuestionOrderByMapper(sortBy ?? SearchQuestionSortByEnum.DATE, orderBy),
      pagination: pagination ?? config.defaultPagination,
    });
    
    return searchQuestionsOutputMapper(questions);
  }
}