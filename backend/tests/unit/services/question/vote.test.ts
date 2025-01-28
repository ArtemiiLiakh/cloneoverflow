import { ForbiddenException, QuestionUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { User } from '@core/domain/entities/User';
import { UserRepository } from '@core/domain/repositories';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionVoteUseCase } from '@core/services/question';

describe('Service: test QuestionVoteUseCase', () => {
  test('Vote question for the first time', async () => {
    const userId = 'userId';
    const vote = VoteTypeEnum.UP;

    const owner = User.new({
      name: 'name',
      username: 'username',
    });

    const questionEntity = Question.new({
      ownerId: owner.id,
      text: 'text',
      title: 'title',
    });

    const userRepositoryMock = {
      addRating: jest.fn(),
    } as Partial<UserRepository>;

    const questionRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
      addRating: jest.fn(),
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: async () => null,
      create: jest.fn(),
    } as Partial<QuestionUserRepository>;

    const unitOfWork = {
      execute: (fn) => fn({
        questionRepository: questionRepositoryMock,
        questionUserRepository: questionUserRepositoryMock,
        userRepository: userRepositoryMock,
      } as Unit),
    } as UnitOfWork;

    const voteUseCase = new QuestionVoteUseCase(
      questionRepositoryMock as QuestionRepository,
      questionUserRepositoryMock as QuestionUserRepository,
      unitOfWork,
    );

    await voteUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
      vote,
    });

    expect(questionUserRepositoryMock.create).toHaveBeenCalled();
    expect(questionRepositoryMock.addRating).toHaveBeenCalled();
    expect(userRepositoryMock.addRating).toHaveBeenCalled();
    expect(questionRepositoryMock.getPartialById).toHaveBeenCalled();
  });

  test('Vote question for the second time', async () => {
    const userId = 'userId';
    const vote = VoteTypeEnum.DOWN;

    const owner = User.new({
      name: 'name',
      username: 'username',
    });

    const questionEntity = Question.new({
      ownerId: owner.id,
      text: 'text',
      title: 'title',
    });

    const questionVoterEntity = QuestionUser.new({
      userId,
      questionId: questionEntity.id,
      status: QuestionUserStatusEnum.VOTER,
      voteType: VoteTypeEnum.UP,
    });

    const userRepositoryMock = {
      addRating: jest.fn(),
    } as Partial<UserRepository>;

    const questionRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
      addRating: jest.fn(),
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: jest.fn().mockReturnValue(Promise.resolve(questionVoterEntity)),
      update: jest.fn(),
    } as Partial<QuestionUserRepository>;

    const unitOfWork = {
      execute: (fn) => fn({
        questionRepository: questionRepositoryMock,
        questionUserRepository: questionUserRepositoryMock,
        userRepository: userRepositoryMock,
      } as Unit),
    } as UnitOfWork;

    const voteUseCase = new QuestionVoteUseCase(
      questionRepositoryMock as QuestionRepository,
      questionUserRepositoryMock as QuestionUserRepository,
      unitOfWork,
    );

    await voteUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
      vote,
    });

    expect(questionUserRepositoryMock.update).toHaveBeenCalled();
    expect(userRepositoryMock.addRating).toHaveBeenCalled();
    expect(questionRepositoryMock.addRating).toHaveBeenCalled();
    expect(questionRepositoryMock.getPartialById).toHaveBeenCalled();
    expect(questionUserRepositoryMock.getOne).toHaveBeenCalled();
  });

  test('Throw an error because question was voted UP twice', () => {
    const userId = 'userId';
    const vote = VoteTypeEnum.UP;

    const questionEntity = Question.new({
      ownerId: 'ownerId',
      text: 'text',
      title: 'title',
    });

    const questionVoterEntity = QuestionUser.new({
      userId,
      questionId: questionEntity.id,
      status: QuestionUserStatusEnum.VOTER,
      voteType: VoteTypeEnum.UP,
    });

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: async () => questionVoterEntity,
    } as Partial<QuestionUserRepository>;

    const voteUseCase = new QuestionVoteUseCase(
      questionRepositoryMock as QuestionRepository,
      questionUserRepositoryMock as QuestionUserRepository,
      {} as UnitOfWork,
    );

    expect(voteUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
      vote,
    })).rejects.toThrow(ForbiddenException);
  });

  test('Throw an error if owner votes his own question', () => {
    const userId = 'userId';
    const vote = VoteTypeEnum.UP;

    const questionEntity = Question.new({
      ownerId: userId,
      text: 'text',
      title: 'title',
    });

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const voteUseCase = new QuestionVoteUseCase(
      questionRepositoryMock as QuestionRepository,
      {} as QuestionUserRepository,
      {} as UnitOfWork,
    );

    expect(voteUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
      vote,
    })).rejects.toThrow(ForbiddenException);
  });
});