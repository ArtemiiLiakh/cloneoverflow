import { OrderByEnum, PaginationResponse } from '@cloneoverflow/common';
import { NumberOptions } from '@common/repository/Datatypes/NumberType';
import { StringOptions } from '@common/repository/Datatypes/StringType';
import { Question } from '@core/domain/entities/Question';
import { Tag } from '@core/domain/entities/Tag';
import { User } from '@core/domain/entities/User';
import { QuestionOrderByType } from '@core/domain/repositories/question/dtos/Params';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionGetManyUseCase } from '@core/services/question';
import { QuestionGetManyInput } from '@core/services/question/getMany/dto';

describe('Service: test QuestionGetAllUseCase', () => {
  const paginationOutput: PaginationResponse = {
    nextElems: 0,
    page: 0,
    pageSize: 0,
    prevElems: 0,
    totalAmount: 0,
    totalPages: 0,
  };

  test('Get list of questions', async () => {
    const question = Question.new({
      title: 'title',
      ownerId: 'ownerId',
      text: 'text',
    });

    const ownerEntity = User.new({
      name: 'name',
      username: 'username',
    });
    
    const tags = [Tag.new({ name: 'name' })];

    const inputData = {
      ownerId: 'ownerId',
      rateFrom: 1,
      rateTo: 1,
      search: 'hello',
      tags: ['tag'],
      pagination: {
        page: 0,
        pageSize: 10,
      },
    } as QuestionGetManyInput;

    const questionRepositoryMock = {
      getMany: async ({ where, orderBy, pagination }) => {
        expect(where.ownerId).toEqual(inputData.ownerId);
        expect((where.rating as NumberOptions).geq).toEqual(inputData.rateFrom);
        expect((where.rating as NumberOptions).leq).toEqual(inputData.rateTo);
        expect((where.title as StringOptions).contains).toEqual(inputData.search);
        expect((where.tags?.name as StringOptions).in).toBe(inputData.tags);
        expect((orderBy as QuestionOrderByType).rating).toEqual(OrderByEnum.DESC);
        expect(pagination?.page).toEqual(inputData.pagination?.page);
        expect(pagination?.pageSize).toEqual(inputData.pagination?.pageSize);

        return {
          data: [{ entity: question, owner: ownerEntity, tags }],
          pagination: paginationOutput,
        };
      },
    } as Partial<QuestionRepository>;

    const questionGetAllUseCase = new QuestionGetManyUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    const { data, pagination } = await questionGetAllUseCase.execute(inputData);
    expect(data.at(0)?.entity.id).toEqual(question.id);
    expect(data.at(0)?.owner?.id).toEqual(ownerEntity.id);
    expect(data.at(0)?.tags).toEqual(tags);
    expect(data.at(0)?.answerAmount).toEqual(0);
    expect(pagination).toBe(paginationOutput);
  });

  test('Get questions with empty result', async () => {
    const questionRepositoryMock = {
      getMany: async () => ({
        data: [],
        pagination: paginationOutput,
      }),
    } as Partial<QuestionRepository>;

    const questionGetAllUseCase = new QuestionGetManyUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    const { data, pagination } = await questionGetAllUseCase.execute({});
    expect(data.length).toEqual(0);
    expect(pagination).toBe(paginationOutput);
  });
});