import { SearchQuestionsUseCase } from '@application/search/usercases';
import { SearchQuestionsInput } from '@application/search/usercases/dtos';
import { SearchQuestionFilterByEnum, UnauthorizedException } from '@cloneoverflow/common';
import { QuestionRepoSearchOutput } from '@core/question/repository/dtos/Search';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Tag } from '@core/tag/Tag';
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
          page: 0,
          pageSize: 0,
          totalAmount: 0,
          totalPages: 0,
          hasNext: false,
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
          page: 0,
          pageSize: 0,
          totalAmount: 0,
          totalPages: 0,
          hasNext: false,
        },
      } as QuestionRepoSearchOutput),
    } as Partial<QuestionRepository>;

    const searchQuestionUseCase = new SearchQuestionsUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    const { data } = await searchQuestionUseCase.execute({});
    expect(data.length).toEqual(0);
  });

  test('Throws an error if user is not specified with favorite questions filter', async () => {
    const question = createQuestion();

    const inputData = {
      filterBy: SearchQuestionFilterByEnum.FAVORITE,
    } as SearchQuestionsInput;

    const questionRepositoryMock = {
      search: jest.fn().mockResolvedValue({
        data: [{
          question,
        }],
      } as QuestionRepoSearchOutput),
    } as Partial<QuestionRepository>;

    const searchQuestionUseCase = new SearchQuestionsUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    expect(searchQuestionUseCase.execute(inputData))
      .rejects.toThrow(UnauthorizedException);
  });
});