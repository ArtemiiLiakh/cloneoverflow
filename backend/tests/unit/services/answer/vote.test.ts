import { AnswerVoteUseCase } from '@application/answer/usecases';
import { IUserRatingValidator } from '@application/validators/types';
import { VoteTypeEnum } from '@cloneoverflow/common';
import { Unit, UnitOfWork } from '@common/repository/UnitOfWork';
import { AnswerVoter } from '@core/answer';
import { CannotVoteAnswerTwice, CannotVoteOwnAnswer } from '@core/answer/exceptions';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { AnswerVoterRepository } from '@core/answer/repository/AnswerVoterRepository';
import { AnswerVoterRepoUpdateInput } from '@core/answer/repository/dtos/answerVoter/Update';
import { UserRepository } from '@core/user/repository/UserRepository';
import { createAnswer, createAnswerVoter } from '@tests/utils/models/answer';

describe('Answer service: test VoteUseCase', () => {
  test('Vote answer for the first time', async () => {
    const answer = createAnswer();

    const executorId = 'userId';
    const vote = VoteTypeEnum.UP;
    
    const userRepositoryMock = {
      increaseRating: jest.fn()
    } as Partial<UserRepository>;

    const answerRepositoryMock = {
      getById: async () => answer,
      voteUp: jest.fn(),
    } as Partial<AnswerRepository>;

    const answerVoterRepositoryMock = {
      create: jest.fn().mockResolvedValue(AnswerVoter.new({
        id: 'id',
        answerId: 'answerId',
        userId: 'userId',
        voteType: VoteTypeEnum.UP,
      })),
      get: async () => null,
    } as Partial<AnswerVoterRepository>;

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;
    
    const unitMock = {
      answerRepository: answerRepositoryMock,
      answerVoterRepository: answerVoterRepositoryMock,
      userRepository: userRepositoryMock,
    } as Unit;

    const answerVoteUseCase = new AnswerVoteUseCase(
      userRatingValidatorMock,
      answerRepositoryMock as AnswerRepository,
      { executeFn: (fn) => fn(unitMock) } as UnitOfWork,
    );

    await answerVoteUseCase.execute({
      executorId,
      answerId: answer.answerId,
      vote,
    });

    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
    expect(answerRepositoryMock.voteUp).toHaveBeenCalled();
    expect(answerVoterRepositoryMock.create).toHaveBeenCalled();
    expect(userRepositoryMock.increaseRating).toHaveBeenCalled();
  });

  test('Vote answer for the second time with different vote', async () => {
    const answer = createAnswer();

    const answerVoter = createAnswerVoter({
      voteType: VoteTypeEnum.UP
    });

    const executorId = 'userId';
    const vote = VoteTypeEnum.DOWN;
    
    const answerRepositoryMock = {
      getById: async () => answer,
    } as Partial<AnswerRepository>;

    const unitMock = {
      answerRepository: {
        voteDown: jest.fn(),
      } as Partial<AnswerRepository>,

      answerVoterRepository: {
        get: async () => answerVoter,
        update: jest.fn().mockImplementation((data: AnswerVoterRepoUpdateInput) => {
          expect(data.voteType).toEqual(VoteTypeEnum.EMPTY);
        }),
      } as Partial<AnswerVoterRepository>,

      userRepository: {
        decreaseRating: jest.fn(),
      } as Partial<UserRepository>,
    } as Unit;

    const userRatingValidatorMock = { 
      validate: jest.fn(),
    } as IUserRatingValidator;
    
    const answerVoteUseCase = new AnswerVoteUseCase(
      userRatingValidatorMock,
      answerRepositoryMock as AnswerRepository,
      { executeFn: (fn) => fn(unitMock) } as UnitOfWork,
    );

    await answerVoteUseCase.execute({
      executorId,
      answerId: answer.answerId,
      vote,
    });

    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
    expect(unitMock.answerRepository.voteDown).toHaveBeenCalled();
    expect(unitMock.answerVoterRepository.update).toHaveBeenCalled();
    expect(unitMock.userRepository.decreaseRating).toHaveBeenCalled();
  });

  test('Throw an error because answer was voted UP twice', async () => {
    const executorId = 'executorId';
    const vote = VoteTypeEnum.DOWN;

    const answer = createAnswer();

    const answerVoter = createAnswerVoter({
      voteType: vote,
    });
    
    const answerRepositoryMock = {
      getById: async () => answer,
    } as Partial<AnswerRepository>;

    const answerVoterRepositoryMock = {
      update: jest.fn(),
      get: async () => answerVoter,
    } as Partial<AnswerVoterRepository>;

    const answerVoteUseCase = new AnswerVoteUseCase(
      { validate: async () => {} } as IUserRatingValidator,
      answerRepositoryMock as AnswerRepository,
      { 
        executeFn: (fn) => fn({ answerVoterRepository: answerVoterRepositoryMock } as Unit) 
      } as UnitOfWork,
    );

    await expect(answerVoteUseCase.execute({
      executorId,
      answerId: answer.answerId,
      vote,
    })).rejects.toThrow(CannotVoteAnswerTwice);

    expect(answerVoterRepositoryMock.update).not.toHaveBeenCalled();
  });

  test('Throw an error if owner votes his own answer', async () => {
    const answer = createAnswer();
    
    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;
    
    const answerRepositoryMock = {
      getById: async () => answer,
    } as Partial<AnswerRepository>;

    const answerVoteUseCase = new AnswerVoteUseCase(
      userRatingValidatorMock,
      answerRepositoryMock as AnswerRepository,
      {} as UnitOfWork,
    );

    await expect(answerVoteUseCase.execute({
      executorId: answer.ownerId,
      answerId: answer.answerId,
      vote: VoteTypeEnum.UP,
    })).rejects.toThrow(CannotVoteOwnAnswer);

    expect(userRatingValidatorMock.validate).not.toHaveBeenCalled();
  });
});