import { ForbiddenException, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionVoterRepository, UserRepository } from '@core/repositories';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { Unit, UnitOfWork } from '@core/repositories/UnitOfWork';
import { QuestionVoteUseCase } from '@core/services/question';
import { IUserRatingValidator } from '@core/services/validators/types';
import { createQuestion, createQuestionVoter } from '@tests/utils/models/question';

describe('Question service: test VoteUseCase', () => {
  test('Vote question for the first time', async () => {
    const userId = 'userId';
    const vote = VoteTypeEnum.UP;

    const question = createQuestion();

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const questionRepositoryMock = {
      getById: jest.fn().mockResolvedValue(question),
    } as Partial<QuestionRepository>;

    const unitMock = {
      questionRepository: {
        voteUp: jest.fn(),
      } as Partial<QuestionRepository>,

      questionVoterRepository: {
        get: jest.fn().mockResolvedValue(null),
        create: jest.fn(),
      } as Partial<QuestionVoterRepository>,

      userRepository: {
        increaseRating: jest.fn(),
      } as Partial<UserRepository>,
    } as Unit;

    const voteUseCase = new QuestionVoteUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      {
        executeFn: (fn) => fn(unitMock),
      } as UnitOfWork,
    );

    await voteUseCase.execute({
      executorId: userId,
      questionId: question.questionId,
      vote,
    });

    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
    expect(questionRepositoryMock.getById).toHaveBeenCalled();
    expect(unitMock.questionRepository.voteUp).toHaveBeenCalled();
    expect(unitMock.questionVoterRepository.get).toHaveBeenCalled();
    expect(unitMock.questionVoterRepository.create).toHaveBeenCalled();
    expect(unitMock.userRepository.increaseRating).toHaveBeenCalled();
  });

  test('Vote question for the second time', async () => {
    const userId = 'userId';
    const vote = VoteTypeEnum.DOWN;

    const questionEntity = createQuestion();
    const questionVoterEntity = createQuestionVoter({
      voteType: VoteTypeEnum.UP
    });

    const questionRepositoryMock = {
      getById: jest.fn().mockResolvedValue(questionEntity),
    } as Partial<QuestionRepository>;

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const unitMock = {
      questionRepository: {
        voteDown: jest.fn(),
      } as Partial<QuestionRepository>,
      
      questionVoterRepository: {
        get: async () => questionVoterEntity,
        update: jest.fn(),
      } as Partial<QuestionVoterRepository>,

      userRepository: {
        decreaseRating: jest.fn(),
      } as Partial<UserRepository>,
    } as Unit;

    const voteUseCase = new QuestionVoteUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      {
        executeFn: (fn) => fn(unitMock),
      } as UnitOfWork,
    );

    await voteUseCase.execute({
      executorId: userId,
      questionId: questionEntity.questionId,
      vote,
    });

    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
    expect(questionRepositoryMock.getById).toHaveBeenCalled();

    expect(unitMock.questionVoterRepository.update).toHaveBeenCalled();
    expect(unitMock.questionRepository.voteDown).toHaveBeenCalled();
    expect(unitMock.userRepository.decreaseRating).toHaveBeenCalled();
  });

  test('Throw an error because question was voted UP twice', () => {
    const userId = 'userId';
    const vote = VoteTypeEnum.UP;

    const questionEntity = createQuestion();
    const questionVoterEntity = createQuestionVoter({
      voteType: vote,
    });

    const questionRepositoryMock = {
      getById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const unit = {
      questionVoterRepository: {
        get: async () => questionVoterEntity
      } as Partial<QuestionVoterRepository>,
    } as Unit;

    const voteUseCase = new QuestionVoteUseCase(
      { validate: async () => {} },
      questionRepositoryMock as QuestionRepository,
      { executeFn: (fn) => fn(unit) } as UnitOfWork,
    );

    expect(voteUseCase.execute({
      executorId: userId,
      questionId: questionEntity.questionId,
      vote,
    })).rejects.toThrow(ForbiddenException);
  });

  test('Throw an error if owner votes his own question', async () => {
    const vote = VoteTypeEnum.UP;

    const questionEntity = createQuestion();

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const questionRepositoryMock = {
      getById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const voteUseCase = new QuestionVoteUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      {} as UnitOfWork,
    );

    await expect(voteUseCase.execute({
      executorId: questionEntity.ownerId,
      questionId: questionEntity.questionId,
      vote,
    })).rejects.toThrow(ForbiddenException);

    expect(userRatingValidatorMock.validate).not.toHaveBeenCalled();
  });
});