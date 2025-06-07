import { AnswersSortByEnum, OrderByEnum, PaginationInfo } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { AnswerRepoGetQuestionAnswersOutput } from '@core/answer/repository/dtos/GetQuestionAnswers';
import { AnswerGetByQuestionUseCase } from '@application/answer/usecases';
import { AnswerGetByQuestionInput } from '@application/answer/usecases/dtos';
import { createAnswerDetails } from '@tests/utils/models/answer';

describe('Answer service: test GetQuestionAnswersUseCase', () => {
  const paginationOutput: PaginationInfo = {
    page: 0,
    pageSize: 0,
    totalAmount: 0,
    totalPages: 0,
    hasNext: false,
  };
  
  test('Get list of question answers', async () => {
    const answerDetails = createAnswerDetails();

    const inputData: AnswerGetByQuestionInput = {
      questionId: 'questionId',
      orderBy: OrderByEnum.ASC,
      sortBy: AnswersSortByEnum.RATE,
      pagination: {
        page: 0,
        pageSize: 10,
      },
    };

    const answerRepositoryMock = {
      getByQuestionId: jest.fn().mockResolvedValue({
        data: [answerDetails],
        pagination: paginationOutput,
      } as AnswerRepoGetQuestionAnswersOutput),
    } as Partial<AnswerRepository>;

    const GetByQuestionUseCase = new AnswerGetByQuestionUseCase(
      answerRepositoryMock as AnswerRepository,
    );

    const { data, pagination } = await GetByQuestionUseCase.execute(inputData);
    expect(data.at(0)).toEqual(answerDetails);
    expect(pagination).toBe(paginationOutput);
    expect(answerRepositoryMock.getByQuestionId).toHaveBeenCalled();
  });

  test('Get answers with empty result', async () => {
    const answerRepositoryMock = {
      getByQuestionId: async () => ({
        data: [],
        pagination: paginationOutput,
      }),
    } as Partial<AnswerRepository>;

    const GetAllUseCase = new AnswerGetByQuestionUseCase(
      answerRepositoryMock as AnswerRepository,
    );

    const { data, pagination } = await GetAllUseCase.execute({
      questionId: 'questionId',
    });
    expect(data.length).toEqual(0);
    expect(pagination).toEqual(paginationOutput);
  });
});