import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { SearchQuestionsFilterBy } from '@core/services/utils/search/SearchQuestionFilterBy';
import { SearchQuestionParse } from '@core/services/utils/search/SearchQuestionParse';
import { SearchQuestionsSortBy } from '@core/services/utils/search/SearchQuestionSortBy';
import { SearchServiceOutput } from '../dtos/SearchServiceOutput';
import { ISearchQuestionsUseCase } from '../types/usecases';
import { SearchServiceInput } from '../dtos/SearchServiceInput';

export class SearchQuestionsUseCase implements ISearchQuestionsUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute (
    { filterBy, search, sortBy, orderBy, pagination }: SearchServiceInput.SearchQuestions,
  ): Promise<SearchServiceOutput.SearchQuestions> {
    const searchFilter = SearchQuestionParse(search);

    const questions = await this.questionRepository.paginate({
      where: SearchQuestionsFilterBy(searchFilter, filterBy),
      pagination,
      options: {
        include: {
          tags: true,
          owner: true,
        },
        count: {
          answers: true,
        },
        orderBy: SearchQuestionsSortBy(sortBy, orderBy),
      },
    });

    return {
      data: questions.data.map(question => ({
        entity: question.entity,
        owner: question.owner!,
        tags: question.tags!,
        answersAmount: question.counts?.answers ?? 0,
      })),
      pagination: questions.pagination,
    };
  }
}