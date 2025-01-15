import { OrderByEnum, PaginationResponse } from '@cloneoverflow/common';
import { NumberOptions } from '@common/repository/Datatypes/NumberType';
import { StringOptions } from '@common/repository/Datatypes/StringType';
import { Answer } from '@core/domain/entities/Answer';
import { Question } from '@core/domain/entities/Question';
import { User } from '@core/domain/entities/User';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerOrderByType } from '@core/domain/repositories/answer/dtos/Params';
import { AnswerServiceInput } from '@core/services/answer/dtos/AnswerServiceInput';
import { AnswerGetAllUseCase } from '@core/services/answer/usecases/getAll';

describe('Service: test AnswerGetAllUseCase', () => {
  const paginationOutput: PaginationResponse = {
    nextElems: 0,
    page: 0,
    pageSize: 0,
    prevElems: 0,
    totalAmount: 0,
    totalPages: 0,
  };
  
  test('Get list of answers', async () => {
    const answer = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    const ownerEntity = User.new({
      name: 'name',
      username: 'username',
    });

    const questionEntity = Question.new({
      ownerId: 'ownerId',
      title: 'title',
      text: 'text',
    });

    const inputData: AnswerServiceInput.GetAll = {
      ownerId: 'ownerId',
      questionId: 'questionId',
      searchText: 'searchText',
      rateFrom: 0,
      rateTo: 0,
      pagination: {
        page: 0,
        pageSize: 10,
      },
    };

    const answerRepositoryMock = {
      getMany: async ({ where, orderBy, pagination }) => {
        expect(where.ownerId).toEqual(inputData.ownerId);
        expect(where.questionId).toEqual(inputData.questionId);
        expect((where.OR?.at(0)?.text as StringOptions).contains).toEqual(inputData.searchText);
        expect((where.OR?.at(1)?.question?.title as StringOptions).contains).toEqual(inputData.searchText);
        expect((where.rating as NumberOptions).geq).toEqual(inputData.rateFrom);
        expect((where.rating as NumberOptions).leq).toEqual(inputData.rateTo);
        expect((orderBy as AnswerOrderByType).rating).toEqual(OrderByEnum.DESC);
        expect(pagination?.page).toEqual(inputData.pagination?.page);
        expect(pagination?.pageSize).toEqual(inputData.pagination?.pageSize);

        return {
          data: [{ 
            entity: answer, 
            owner: ownerEntity, 
            question: questionEntity, 
          }],
          pagination: paginationOutput,
        };
      },
    } as Partial<AnswerRepository>;

    const answerGetAllUseCase = new AnswerGetAllUseCase(
      answerRepositoryMock as AnswerRepository,
    );

    const { data, pagination } = await answerGetAllUseCase.execute(inputData);
    expect(data.at(0)?.entity.id).toEqual(answer.id);
    expect(data.at(0)?.owner.id).toEqual(ownerEntity.id);
    expect(data.at(0)?.question.id).toEqual(questionEntity.id);
    expect(pagination).toBe(paginationOutput);
  });

  test('Get answers with empty result', async () => {
    const answerRepositoryMock = {
      getMany: async () => ({
        data: [],
        pagination: paginationOutput,
      }),
    } as Partial<AnswerRepository>;

    const answerGetAllUseCase = new AnswerGetAllUseCase(
      answerRepositoryMock as AnswerRepository,
    );

    const { data, pagination } = await answerGetAllUseCase.execute({});
    expect(data.length).toEqual(0);
    expect(pagination).toEqual(paginationOutput);
  });
});