import { AnswerUserStatusEnum } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerCreateUseCase } from '@core/services/answer';
import { AnswerCreateInput } from '@core/services/answer/create/dto';

describe('Service: test AnswerCreateUseCase', () => {
  test('Create answer', async () => {
    const inputData = {
      executorId: 'executorId',
      questionId: 'questionId',
      text: 'text',
    } as AnswerCreateInput;

    let answerEntity: Answer | null = null;

    const questionRepositoryMock = {
      validateById: async () => {},
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      create: async ({ answer }) => {
        expect(answer.text).toEqual(inputData.text);
        expect(answer.questionId).toEqual(inputData.questionId);
        expect(answer.ownerId).toEqual(inputData.executorId);
        answerEntity = answer;
      },
    } as Partial<AnswerRepository>;

    const answerUserRepositoryMock = {
      create: async ({ user }) => {
        expect(user.answerId).toEqual(answerEntity?.id);
        expect(user.userId).toEqual(inputData.executorId);
        expect(user.status).toEqual(AnswerUserStatusEnum.OWNER);
      },
    } as Partial<AnswerUserRepository>;

    const unitOfWorkMock = {
      execute: async (fn) => fn({
        answerRepository: answerRepositoryMock,
        answerUserRepository: answerUserRepositoryMock,
      } as Unit),
    } as UnitOfWork;

    const createUseCase = new AnswerCreateUseCase(
      questionRepositoryMock as QuestionRepository,
      unitOfWorkMock,
    );

    const answer = await createUseCase.execute(inputData);
    expect(answer).toBe(answerEntity);
  });

  test('Throw an error because unit of work failed', () => {
    const questionRepositoryMock = {
      validateById: async () => {},
    } as Partial<QuestionRepository>;

    const createUseCase = new AnswerCreateUseCase(
      questionRepositoryMock as QuestionRepository,
      { execute: async () => null } as UnitOfWork, 
    ); 

    expect(createUseCase.execute({ 
      executorId: 'user',
      questionId: 'questionId',
      text: 'text',
    })).rejects.toThrow();
  });
});