import { AnswerUserStatusEnum, ForbiddenException, VoteTypeEnum } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { AnswerUserRepositoryInput } from '@core/domain/repositories/answer/dtos/answerUser/AnswerUserRepositoryInput';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerVoteUseCase } from '@core/services/answer/usecases/vote';

describe('Service: test AnswerVoteUseCase', () => {
  test('Vote answer for the first time', async () => {
    const answer = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    const executorId = 'userId';
    const vote = VoteTypeEnum.UP;
    
    const answerRepositoryMock = {
      getPartialById: async () => answer,
      addRating: jest.fn().mockImplementation(
        ({ answerId, voteType }) => {
          expect(answerId).toEqual(answer.id);
          expect(voteType).toEqual(vote);
        },
      ),
    } as Partial<AnswerRepository>;

    const answerUserRepositoryMock = {
      getOne: async () => null,
      create: jest.fn().mockImplementation(
        ({ user }: AnswerUserRepositoryInput.Create) => {
          expect(user.answerId).toEqual(answer.id);
          expect(user.userId).toEqual(executorId);
          expect(user.status).toEqual(AnswerUserStatusEnum.VOTER);
          expect(user.voteType).toEqual(vote);
        },
      ),
    } as Partial<AnswerUserRepository>;

    const unitMock = {
      answerRepository: answerRepositoryMock,
      answerUserRepository: answerUserRepositoryMock,
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
    expect(answerUserRepositoryMock.create).toHaveBeenCalled();
  });

  test('Vote answer for the second time', async () => {
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
    
    const answerRepositoryMock = {
      getPartialById: async () => answer,
      addRating: jest.fn().mockImplementation(
        ({ answerId, voteType }) => {
          expect(answerId).toEqual(answer.id);
          expect(voteType).toEqual(vote);
        },
      ),
    } as Partial<AnswerRepository>;

    const answerUserRepositoryMock = {
      getOne: async () => answerUser,
      update: jest.fn().mockImplementation(
        ({ answerUserId, data }: AnswerUserRepositoryInput.Update) => {
          expect(answerUserId).toEqual(answerUser.id);
          expect(data.voteType).toBeNull();
        },
      ),
    } as Partial<AnswerUserRepository>;

    const unitMock = {
      answerRepository: answerRepositoryMock,
      answerUserRepository: answerUserRepositoryMock,
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
  });

  test('Throw an error because answer was voted UP twice', () => {
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

    const executorId = 'userId';
    const vote = VoteTypeEnum.DOWN;
    
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