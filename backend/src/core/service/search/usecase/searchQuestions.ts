import { QuestionRepository } from "@core/domain/repositories/question/QuestionRepository";
import { SearchQuestionsFilterBy } from "@core/service/utils/SearchServiceUtils/SearchQuestionFilterBy";
import { SearchQuestionParse } from "@core/service/utils/SearchServiceUtils/SearchQuestionParse";
import { SearchQuestionsSortBy } from "@core/service/utils/SearchServiceUtils/SearchQuestionSortBy";
import { SearchServiceOutput } from "../dto/SearchServiceOutput";
import { ISearchQuestionsUseCase } from "../types/usecases";
import { SearchServiceInput } from "../dto/SearchServiceInput";

export class SearchQuestionsUseCase implements ISearchQuestionsUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute(
    { filterBy, search, sortBy, orderBy, pagination }: SearchServiceInput.SearchQuestions
  ): Promise<SearchServiceOutput.SearchQuestions> {
    const searchFilter = SearchQuestionParse(search);
    const where = SearchQuestionsFilterBy(searchFilter, filterBy);

    const questions = await this.questionRepository.paginate({
      where,
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