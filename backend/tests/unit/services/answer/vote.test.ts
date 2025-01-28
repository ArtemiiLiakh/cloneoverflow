import { AnswerUserStatusEnum, ForbiddenException, VoteTypeEnum } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { UserRepository } from '@core/domain/repositories';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerVoteUseCase } from '@core/services/answer';

describe('Service: test AnswerVoteUseCase', () => {
  test('Vote answer for the first time', async () => {
    const answer = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    const executorId = 'userId';
    const vote = VoteTypeEnum.UP;
    
    const userRepositoryMock = {
      addRating: jest.fn(),
    } as Partial<UserRepository>;

    const answerRepositoryMock = {
      getPartialById: async () => answer,
      addRating: jest.fn(),
    } as Partial<AnswerRepository>;

    const answerUserRepositoryMock = {
      getOne: async () => null,
      create: jest.fn(),
    } as Partial<AnswerUserRepository>;

    const unitMock = {
      answerRepository: answerRepositoryMock,
      answerUserRepository: answerUserRepositoryMock,
      userRepository: userRepositoryMock,
    } as Unit;

    const answerVoteUseCase = new AnswerVoteUseCase(
      answerRepositoryMock as AnswerRepository,
      answerUserRepositoryMock as AnswerUserRepository,
      { execute: (fn) => fn(unitMock) } as UnitOfWork,
    );

    await answerVoteUseCase.execute({
      executorId,
      answerId: answer.id,
      vote,
    });

    expect(answerRepositoryMock.addRating).toHaveBeenCalled();
    expect(answerUserRepositoryMock.create).toHaveBeenCalled();
    expect(userRepositoryMock.addRating).toHaveBeenCalled();
  });

  test('Vote answer for the second time with different vote', async () => {
    const answer = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    const answerUser = AnswerUser.new({
      answerId: 'answerId',
      userId: 'userId',
      status: AnswerUserStatusEnum.VOTER,
      voteType: VoteTypeEnum.UP,
    });

    const executorId = 'userId';
    const vote = VoteTypeEnum.DOWN;
    
    const userRepositoryMock = {
      addRating: jest.fn(),
    } as Partial<UserRepository>;

    const answerRepositoryMock = {
      getPartialById: async () => answer,
      addRating: jest.fn(),
    } as Partial<AnswerRepository>;

    const answerUserRepositoryMock = {
      getOne: async () => answerUser,
      update: jest.fn(),
    } as Partial<AnswerUserRepository>;

    const unitMock = {
      answerRepository: answerRepositoryMock,
      answerUserRepository: answerUserRepositoryMock,
      userRepository: userRepositoryMock,
    } as Partial<Unit>;

    const answerVoteUseCase = new AnswerVoteUseCase(
      answerRepositoryMock as AnswerRepository,
      answerUserRepositoryMock as AnswerUserRepository,
      { execute: (fn) => fn(unitMock as Unit) } as UnitOfWork,
    );

    await answerVoteUseCase.execute({
      executorId,
      answerId: answer.id,
      vote,
    });

    expect(answerRepositoryMock.addRating).toHaveBeenCalled();
    expect(answerUserRepositoryMock.update).toHaveBeenCalled();
    expect(userRepositoryMock.addRating).toHaveBeenCalled();
  });

  test('Throw an error because answer was voted UP twice', () => {
    const executorId = 'userId';
    const vote = VoteTypeEnum.DOWN;

    const answer = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    const answerUser = AnswerUser.new({
      answerId: 'answerId',
      userId: 'userId',
      status: AnswerUserStatusEnum.VOTER,
      voteType: VoteTypeEnum.DOWN,
    });
    
    const answerRepositoryMock = {
      getPartialById: async () => answer,
    } as Partial<AnswerRepository>;

    const answerUserRepositoryMock = {
      getOne: async () => answerUser,
    } as Partial<AnswerUserRepository>;

    const answerVoteUseCase = new AnswerVoteUseCase(
      answerRepositoryMock as AnswerRepository,
      answerUserRepositoryMock as AnswerUserRepository,
      {} as UnitOfWork,
    );

    expect(answerVoteUseCase.execute({
      executorId,
      answerId: answer.id,
      vote,
    })).rejects.toThrow(ForbiddenException);
  });

  test('Throw an error if owner votes his own answer', () => {
    const answer = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });
    
    const answerRepositoryMock = {
      getPartialById: async () => answer,
    } as Partial<AnswerRepository>;

    const answerVoteUseCase = new AnswerVoteUseCase(
      answerRepositoryMock as AnswerRepository,
      {} as AnswerUserRepository,
      {} as UnitOfWork,
    );

    expect(answerVoteUseCase.execute({
      executorId: answer.ownerId,
      answerId: answer.id,
      vote: VoteTypeEnum.UP,
    })).rejects.toThrow(ForbiddenException);
  });
});