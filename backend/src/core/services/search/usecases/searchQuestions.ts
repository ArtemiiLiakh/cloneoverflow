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
    
    const questions = await this.questionRepository.getMany({
      where: SearchQuestionsFilterBy(searchFilter, filterBy),
      pagination,
      include: {
        tags: true,
        owner: true,
      },
      counts: {
        answers: true,
      },
      orderBy: SearchQuestionsSortBy(sortBy, orderBy),
    });
    
    return {
      data: questions.data.map(question => ({
        entity: {
          questionId: question.entity.id!,
          ownerId: question.entity.ownerId!,
          title: question.entity.title!,
          rating: question.entity.rating!,
          views: question.entity.views!,
          isClosed: question.entity.isClosed!,
          createdAt: question.entity.createdAt!,
        },
        owner: {
          userId: question.owner!.id,
          name: question.owner!.name,
          username: question.owner!.username,
          rating: question.owner!.rating,
        },
        tags: question.tags!,
        answersAmount: question.counts?.answers ?? 0,
      })),
      pagination: questions.pagination,
    };
  }
}