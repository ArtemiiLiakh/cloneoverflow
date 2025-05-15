import { PaginationResponse } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { Question } from '@core/domain/entities/Question';
import { User } from '@core/domain/entities/User';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerGetManyUseCase } from '@core/services/answer';
import { AnswerGetManyInput } from '@core/services/answer/getMany/dto';

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

    const inputData: AnswerGetManyInput = {
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
      getMany: async () => ({
        data: [{ 
          entity: answer, 
          owner: ownerEntity, 
          question: questionEntity, 
        }],
        pagination: paginationOutput,
      }),
    } as Partial<AnswerRepository>;

    const answerGetAllUseCase = new AnswerGetManyUseCase(
      answerRepositoryMock as AnswerRepository,
    );

    const { data, pagination } = await answerGetAllUseCase.execute(inputData);
    expect(data.at(0)?.entity.id).toEqual(answer.id);
    expect(data.at(0)?.owner?.id).toEqual(ownerEntity.id);
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

    const answerGetAllUseCase = new AnswerGetManyUseCase(
      answerRepositoryMock as AnswerRepository,
    );

    const { data, pagination } = await answerGetAllUseCase.execute({});
    expect(data.length).toEqual(0);
    expect(pagination).toEqual(paginationOutput);
  });
});