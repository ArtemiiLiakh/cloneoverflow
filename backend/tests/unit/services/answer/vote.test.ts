import { ForbiddenException, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerVoter } from '@core/models/answer';
import { AnswerVoterRepository, UserRepository } from '@core/repositories';
import { AnswerRepository } from '@core/repositories/answer/AnswerRepository';
import { AnswerVoterRepoUpdateInput } from '@core/repositories/answer/answerVoter/dtos/Update';
import { Unit, UnitOfWork } from '@core/repositories/UnitOfWork';
import { AnswerVoteUseCase } from '@core/services/answer';
import { IUserRatingValidator } from '@core/services/validators/types';
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
    })).rejects.toThrow(ForbiddenException);

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
    })).rejects.toThrow(ForbiddenException);

    expect(userRatingValidatorMock.validate).not.toHaveBeenCalled();
  });
});