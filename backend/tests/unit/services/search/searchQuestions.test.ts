import { SearchQuestionFilterByEnum } from '@cloneoverflow/common';
import { Tag } from '@core/models/tag/Tag';
import { QuestionRepoSearchOutput } from '@core/repositories/question/dtos/Search';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { SearchQuestionsUseCase } from '@core/services/search';
import { SearchQuestionsInput } from '@core/services/search/searchQuestions/dto';
import { createQuestion, createQuestionOwner } from '@tests/utils/models/question';

describe('Search service: test QuestionUseCase', () => {
  test('Search questions', async () => {
    const question = createQuestion();
    const owner = createQuestionOwner();

    const tags = [Tag.new({ id: 'id', name: 'name' })];

    const inputData = {
      pagination: {
        page: 0,
        pageSize: 10,
      },
      filterBy: SearchQuestionFilterByEnum.CLOSED,
      search: 'hello',
    } as SearchQuestionsInput;

    const questionRepositoryMock = {
      search: jest.fn().mockResolvedValue({
        data: [{
          question,
          owner,
          tags,
          answersAmount: 0,
        }],
        pagination: {
          nextElems: 0,
          page: 0,
          pageSize: 0,
          prevElems: 0,
          totalAmount: 0,
          totalPages: 0,
        },
      } as QuestionRepoSearchOutput),
    } as Partial<QuestionRepository>;

    const searchQuestionUseCase = new SearchQuestionsUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    const { data } = await searchQuestionUseCase.execute(inputData);
    expect(data.at(0)?.entity.questionId).toBe(question.questionId);
    expect(data.at(0)?.owner?.userId).toBe(owner.userId);
    expect(data.at(0)?.tags).toBe(tags);
    expect(questionRepositoryMock.search).toHaveBeenCalled();
  });

  test('Search questions with empty result', async () => {
    const questionRepositoryMock = {
      search: async () => ({
        data: [],
        pagination: {
          nextElems: 0,
          page: 0,
          pageSize: 0,
          prevElems: 0,
          totalAmount: 0,
          totalPages: 0,
        },
      } as QuestionRepoSearchOutput),
    } as Partial<QuestionRepository>;

    const searchQuestionUseCase = new SearchQuestionsUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    const { data } = await searchQuestionUseCase.execute({});
    expect(data.length).toEqual(0);
  });
});