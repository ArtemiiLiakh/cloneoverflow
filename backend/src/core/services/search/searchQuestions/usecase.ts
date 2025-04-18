import config from '@/config';
import { SearchQuestionFilterByEnum, SearchQuestionSortByEnum, UnauthorizedException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/repositories';
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
      throw new UnauthorizedException('Filter by favorite is available for authorized user');;
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