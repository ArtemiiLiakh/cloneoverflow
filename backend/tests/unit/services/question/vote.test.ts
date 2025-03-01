import { ForbiddenException, QuestionUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { Question } from '@core/models/Question';
import { QuestionUser } from '@core/models/QuestionUser';
import { User } from '@core/models/User';
import { UserRepository } from '@core/repositories';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/repositories/question/QuestionUserRepository';
import { Unit, UnitOfWork } from '@core/repositories/UnitOfWork';
import { QuestionVoteUseCase } from '@core/services/question';
import { IUserRatingValidator } from '@core/services/validators/types';

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

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const questionRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: jest.fn().mockReturnValue(Promise.resolve(null)),
    } as Partial<QuestionUserRepository>;

    const unitMock = {
      questionRepository: {
        addRating: jest.fn(),
      } as Partial<QuestionRepository>,

      questionUserRepository: {
        create: jest.fn(),
      } as Partial<QuestionUserRepository>,

      userRepository: {
        addRating: jest.fn(),
      } as Partial<UserRepository>,
    } as Unit;

    const voteUseCase = new QuestionVoteUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      questionUserRepositoryMock as QuestionUserRepository,
      {
        execute: (fn) => fn(unitMock),
        executeAll: async () => {},
      } as UnitOfWork,
    );

    await voteUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
      vote,
    });

    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
    expect(questionRepositoryMock.getPartialById).toHaveBeenCalled();
    expect(questionUserRepositoryMock.getOne).toHaveBeenCalled();
    expect(unitMock.questionUserRepository.create).toHaveBeenCalled();
    expect(unitMock.questionRepository.addRating).toHaveBeenCalled();
    expect(unitMock.userRepository.addRating).toHaveBeenCalled();
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

    const questionRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: jest.fn().mockReturnValue(Promise.resolve(questionVoterEntity)),
    } as Partial<QuestionUserRepository>;

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const unitMock = {
      questionRepository: {
        addRating: jest.fn(),
      } as Partial<QuestionRepository>,
      
      questionUserRepository: {
        update: jest.fn(),
      } as Partial<QuestionUserRepository>,

      userRepository: {
        addRating: jest.fn(),
      } as Partial<UserRepository>,
    } as Unit;

    const voteUseCase = new QuestionVoteUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      questionUserRepositoryMock as QuestionUserRepository,
      {
        execute: (fn) => fn(unitMock),
        executeAll: async () => {},
      } as UnitOfWork,
    );

    await voteUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
      vote,
    });

    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
    expect(questionRepositoryMock.getPartialById).toHaveBeenCalled();
    expect(questionUserRepositoryMock.getOne).toHaveBeenCalled();

    expect(unitMock.questionUserRepository.update).toHaveBeenCalled();
    expect(unitMock.userRepository.addRating).toHaveBeenCalled();
    expect(unitMock.questionRepository.addRating).toHaveBeenCalled();
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
      { validate: async () => {} },
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

  test('Throw an error if owner votes his own question', async () => {
    const userId = 'userId';
    const vote = VoteTypeEnum.UP;

    const questionEntity = Question.new({
      ownerId: userId,
      text: 'text',
      title: 'title',
    });

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const voteUseCase = new QuestionVoteUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      {} as QuestionUserRepository,
      {} as UnitOfWork,
    );

    await expect(voteUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
      vote,
    })).rejects.toThrow(ForbiddenException);

    expect(userRatingValidatorMock.validate).not.toHaveBeenCalled();
  });
});