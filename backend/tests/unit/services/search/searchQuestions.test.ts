import { SearchQuestionFilterByEnum } from '@cloneoverflow/common';
import { Question } from '@core/models/Question';
import { Tag } from '@core/models/Tag';
import { User } from '@core/models/User';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { SearchQuestionsUseCase } from '@core/services/search';
import { SearchQuestionsInput } from '@core/services/search/searchQuestions/dto';

describe('Service: test SearchQuestionUseCase', () => {
  test('Search questions', async () => {
    const questionEntity = Question.new({
      ownerId: 'ownerId',
      text: 'text',
      title: 'title',
    });

    const ownerEntity = User.new({
      name: 'name',
      username: 'username',
    });

    const tags = [Tag.new({ name: 'name' })];

    const inputData = {
      pagination: {
        page: 0,
        pageSize: 10,
      },
      filterBy: SearchQuestionFilterByEnum.CLOSED,
      search: 'hello',
    } as SearchQuestionsInput;

    const questionRepositoryMock = {
      getMany: jest.fn().mockReturnValue(Promise.resolve({
        data: [{ 
          entity: questionEntity, 
          owner: ownerEntity,
          tags,
        }],
      })),
    } as Partial<QuestionRepository>;

    const searchQuestionUseCase = new SearchQuestionsUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    const { data } = await searchQuestionUseCase.execute(inputData);
    expect(data.at(0)?.entity.questionId).toBe(questionEntity.id);
    expect(data.at(0)?.owner?.userId).toBe(ownerEntity.id);
    expect(data.at(0)?.tags).toBe(tags);
    expect(questionRepositoryMock.getMany).toHaveBeenCalled();
  });

  test('Search questions with empty result', async () => {
    const questionRepositoryMock = {
      getMany: async () => ({
        data: [],
        pagination: {
          nextElems: 0,
          page: 0,
          pageSize: 0,
          prevElems: 0,
          totalAmount: 0,
          totalPages: 0,
        },
      }),
    } as Partial<QuestionRepository>;

    const searchQuestionUseCase = new SearchQuestionsUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    const { data } =  await searchQuestionUseCase.execute({});
    expect(data.length).toEqual(0);
  });
});