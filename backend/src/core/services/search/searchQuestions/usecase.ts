import { QuestionRepository } from '@core/domain/repositories';
import { SearchQuestionsFilterBy } from '@core/services/search/searchQuestions/utils/SearchQuestionFilterBy';
import { SearchQuestionParse } from '@core/services/search/searchQuestions/utils/SearchQuestionParse';
import { SearchQuestionsSortBy } from '@core/services/search/searchQuestions/utils/SearchQuestionSortBy';
import { SearchQuestionsInput, SearchQuestionsOutput } from './dto';
import { searchQuestionsOutputMapper } from './mapper';
import { ISearchQuestionsUseCase } from './type';

export class SearchQuestionsUseCase implements ISearchQuestionsUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute (
    { filterBy, search, sortBy, orderBy, pagination }: SearchQuestionsInput,
  ): Promise<SearchQuestionsOutput> {
    const searchFilter = SearchQuestionParse(search);
    
    const questions = await this.questionRepository.getMany({
      where: SearchQuestionsFilterBy(searchFilter, filterBy),
      pagination,
      select: {
        id: true,
        ownerId: true,
        title: true,
        rating: true,
        views: true,
        isClosed: true,
        createdAt: true,
      },
      include: {
        tags: true,
        owner: true,
      },
      counts: {
        answers: true,
      },
      orderBy: SearchQuestionsSortBy(sortBy, orderBy),
    });
    
    return searchQuestionsOutputMapper(questions);
  }
}