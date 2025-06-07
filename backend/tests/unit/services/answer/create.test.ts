import { AnswerCreateUseCase } from '@application/answer/usecases';
import { AnswerCreateInput } from '@application/answer/usecases/create/dto';
import { QuestionIdInvalid } from '@core/question/exceptions';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { createAnswer } from '@tests/utils/models/answer';

describe('Answer service: test CreateUseCase', () => {
  test('Create answer', async () => {
    const inputData = {
      executorId: 'executorId',
      questionId: 'questionId',
      text: 'text',
    } as AnswerCreateInput;

    const newAnswer = createAnswer();

    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(true),
    } as Partial<QuestionRepository>;

    const answerRepositoryMock =  {
      create: jest.fn().mockResolvedValue(newAnswer),
    } as Partial<AnswerRepository>;

    const createUseCase = new AnswerCreateUseCase(
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
    );

    const answer = await createUseCase.execute(inputData);

    expect(questionRepositoryMock.isExist).toHaveBeenCalled();
    expect(answerRepositoryMock.create).toHaveBeenCalled();

    expect(answer).toBe(newAnswer);
  });

  test('Throw and error because question does not exist', async () => {
    const inputData = {
      executorId: 'executorId',
      questionId: 'questionId',
      text: 'text',
    } as AnswerCreateInput;

    const questionRepositoryMock = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(false)),
    } as Partial<QuestionRepository>;

    const createUseCase = new AnswerCreateUseCase(
      questionRepositoryMock as QuestionRepository,
      {} as AnswerRepository, 
    );

    expect(createUseCase.execute(inputData)).rejects.toThrow(QuestionIdInvalid);
  });
});