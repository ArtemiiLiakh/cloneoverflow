import { Exception } from '@cloneoverflow/common';
import { Question } from '@core/models/Question';
import { Tag } from '@core/models/Tag';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { TagRepository } from '@core/repositories/tag/TagRepository';
import { Unit, UnitOfWork } from '@core/repositories/UnitOfWork';
import { QuestionUpdateUseCase } from '@core/services/question';
import { QuestionUpdateInput } from '@core/services/question/update/dto';
import { IUserRatingValidator } from '@core/services/validators/types';

describe('Service: test QuestionUpdateUseCase', () => {
  test('Update question without tags', async () => {
    const ownerId = 'userId';

    const questionEntity = Question.new({
      ownerId: ownerId,
      text: 'text',
      title: 'title',
    });

    const updateData = {
      title: 'title2',
      text: 'text2',
    } as QuestionUpdateInput['data'];

    const questionRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
    } as Partial<QuestionRepository>;

    const unitMock = {
      questionRepository: {
        update: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
      } as Partial<QuestionRepository>,
    } as Unit;

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const updateUseCase = new QuestionUpdateUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      {
        execute: (fn) => fn(unitMock),
      } as UnitOfWork,
    );

    const updatedQuestion = await updateUseCase.execute({
      executorId: ownerId,
      questionId: questionEntity.id,
      data: updateData,
    });

    expect(updatedQuestion).toBe(questionEntity);
    expect(questionRepositoryMock.getPartialById).toHaveBeenCalled();
    expect(userRatingValidatorMock.validate).not.toHaveBeenCalled();
  });

  test('Update question with tags', async () => {
    const ownerId = 'userId';

    const questionEntity = Question.new({
      ownerId: ownerId,
      text: 'text',
      title: 'title',
    });

    const tagEntity = Tag.new({
      name: 'test',
    });

    const updateData = {
      title: 'title2',
      text: 'text2',
      tags: [tagEntity.name],
    } as QuestionUpdateInput['data'];

    const questionRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
    } as Partial<QuestionRepository>;

    const unitMock = {
      questionRepository: {
        update: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
        unrefAllTags: jest.fn(),
        refTags: jest.fn(),
      } as Partial<QuestionRepository>,

      tagRepository: {
        createOrFindMany: jest.fn().mockReturnValue(Promise.resolve([tagEntity])),
      } as Partial<TagRepository>,
    } as Unit;

    const updateUseCase = new QuestionUpdateUseCase(
      {} as IUserRatingValidator,
      questionRepositoryMock as QuestionRepository,
      {
        execute: (fn) => fn(unitMock),
      } as UnitOfWork,
    );

    const question = await updateUseCase.execute({ 
      executorId: ownerId,
      questionId: questionEntity.id,
      data: updateData,
    });

    expect(question).toBe(questionEntity);
    expect(questionRepositoryMock.getPartialById).toHaveBeenCalled();
    expect(unitMock.questionRepository.update).toHaveBeenCalled();
    expect(unitMock.questionRepository.unrefAllTags).toHaveBeenCalled();
    expect(unitMock.questionRepository.refTags).toHaveBeenCalled();
    expect(unitMock.tagRepository.createOrFindMany).toHaveBeenCalled();
  });

  test('Update question with another user', async () => {
    const userId = 'userId'; 
    
    const questionEntity = Question.new({
      ownerId: 'ownerId',
      title: 'title',
      text: 'text',
    });
    
    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const questionRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
    } as Partial<QuestionRepository>;

    const updateUseCase = new QuestionUpdateUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      {
        execute: async () => {},
        executeAll: async () => {},
      } as UnitOfWork,
    );

    await updateUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
      data: {},
    });

    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
    expect(questionRepositoryMock.getPartialById).toHaveBeenCalled();
  });

  test('Throw an error because unit of work is failed', () => {
    const ownerId = 'userId';

    const questionEntity = Question.new({
      ownerId: ownerId,
      text: 'text',
      title: 'title',
    });

    const updateData = {
      title: 'title2',
      text: 'text2',
    } as QuestionUpdateInput['data'];

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const updateUseCase = new QuestionUpdateUseCase(
      {} as IUserRatingValidator,
      questionRepositoryMock as QuestionRepository,
      { 
        execute: () => Promise.reject(new Error()),
        executeAll: async () => {},
      } as UnitOfWork,
    );

    expect(updateUseCase.execute({
      executorId: ownerId,
      questionId: questionEntity.id,
      data: updateData,
    })).rejects.toThrow(Exception);
  });
});