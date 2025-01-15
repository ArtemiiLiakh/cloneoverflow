import { ForbiddenException, QuestionUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { User } from '@core/domain/entities/User';
import { QuestionUserRepositoryInput } from '@core/domain/repositories/question/dtos/questionUser/QuestionUserRepositoryInput';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionVoteUseCase } from '@core/services/question/usecases/vote';

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

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
      addRating: async ({ questionId, voteType }) => {
        expect(questionId).toEqual(questionEntity.id);
        expect(voteType).toEqual(vote);
      },
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: async () => null,
      create: jest.fn().mockImplementation(
        ({ user }: QuestionUserRepositoryInput.Create) => {
          expect(user.questionId).toEqual(questionEntity.id);
          expect(user.userId).toEqual(userId);
          expect(user.status).toEqual(QuestionUserStatusEnum.VOTER);
          expect(user.voteType).toEqual(vote);
        },
      ),
    } as Partial<QuestionUserRepository>;

    const unitOfWork = {
      execute: (fn) => fn({
        questionRepository: questionRepositoryMock,
        questionUserRepository: questionUserRepositoryMock,
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
      getPartialById: async () => questionEntity,
      addRating: async ({ questionId, voteType }) => {
        expect(questionId).toEqual(questionEntity.id);
        expect(voteType).toEqual(vote);
      },
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: async () => questionVoterEntity,
      update: jest.fn().mockImplementation(
        ({ questionUserId, data }: QuestionUserRepositoryInput.Update) => {
          expect(questionUserId).toEqual(questionVoterEntity.id);
          expect(data.voteType).toBeNull();
        },
      ),
    } as Partial<QuestionUserRepository>;

    const unitOfWork = {
      execute: (fn) => fn({
        questionRepository: questionRepositoryMock,
        questionUserRepository: questionUserRepositoryMock,
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
      update: jest.fn().mockImplementation(
        ({ questionUserId, data }: QuestionUserRepositoryInput.Update) => {
          expect(questionUserId).toEqual(questionVoterEntity.id);
          expect(data.voteType).toBeNull();
        },
      ),
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