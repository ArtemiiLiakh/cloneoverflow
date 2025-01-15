import { AnswerUserStatusEnum } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerServiceInput } from '@core/services/answer/dtos/AnswerServiceInput';
import { AnswerCreateUseCase } from '@core/services/answer/usecases/create';
import { IValidateQuestionUseCase } from '@core/services/validation/types/usecases';

describe('Service: test AnswerCreateUseCase', () => {
  test('Create answer', async () => {
    const inputData = {
      executorId: 'executorId',
      questionId: 'questionId',
      text: 'text',
    } as AnswerServiceInput.Create;

    let answerEntity: Answer | null = null;

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
      { execute: async () => {} } as IValidateQuestionUseCase,
      unitOfWorkMock,
    );

    const answer = await createUseCase.execute(inputData);
    expect(answer).toBe(answerEntity);
  });

  test('Throw an error because unit of work failed', () => {
    const createUseCase = new AnswerCreateUseCase(
      { execute: async () => {} } as IValidateQuestionUseCase,
      { execute: async () => null } as UnitOfWork, 
    ); 

    expect(createUseCase.execute({ 
      executorId: 'user',
      questionId: 'questionId',
      text: 'text',
    })).rejects.toThrow();
  });
});