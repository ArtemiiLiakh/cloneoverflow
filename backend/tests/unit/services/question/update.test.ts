import { Exception } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { TagRepository } from '@core/repositories/tag/TagRepository';
import { Unit, UnitOfWork } from '@core/repositories/UnitOfWork';
import { QuestionUpdateUseCase } from '@core/services/question';
import { QuestionUpdateInput } from '@core/services/question/update/dto';
import { IUserRatingValidator } from '@core/services/validators/types';
import { createQuestion } from '@tests/utils/models/question';
import { createTag } from '@tests/utils/models/tag';

describe('Question service: test UpdateUseCase', () => {
  test('Update question without tags', async () => {
    const question = createQuestion();

    const updateData = {
      title: 'title2',
      text: 'text2',
    } as QuestionUpdateInput['data'];

    const questionRepositoryMock = {
      getById: jest.fn().mockResolvedValue(question),
    } as Partial<QuestionRepository>;

    const unitMock = {
      questionRepository: {
        update: jest.fn().mockResolvedValue(question),
      } as Partial<QuestionRepository>,
    } as Unit;

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const updateUseCase = new QuestionUpdateUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      {
        executeFn: (fn) => fn(unitMock),
      } as UnitOfWork,
    );

    const updatedQuestion = await updateUseCase.execute({
      executorId: question.ownerId,
      questionId: question.questionId,
      data: updateData,
    });

    expect(updatedQuestion).toEqual(question);
    expect(userRatingValidatorMock.validate).not.toHaveBeenCalled();
    expect(questionRepositoryMock.getById).toHaveBeenCalled();
  });

  test('Update question with tags', async () => {
    const question = createQuestion();
    const tag = createTag();

    const updateData = {
      title: 'title2',
      text: 'text2',
      tags: [tag.name],
    } as QuestionUpdateInput['data'];

    const questionRepositoryMock = {
      getById: jest.fn().mockResolvedValue(question),
    } as Partial<QuestionRepository>;

    const unitMock = {
      questionRepository: {
        update: jest.fn().mockResolvedValue(question),
        unrefAllTags: jest.fn(),
        refTags: jest.fn(),
      } as Partial<QuestionRepository>,

      tagRepository: {
        createOrFindMany: jest.fn().mockResolvedValue([tag]),
      } as Partial<TagRepository>,
    } as Unit;

    const updateUseCase = new QuestionUpdateUseCase(
      {} as IUserRatingValidator,
      questionRepositoryMock as QuestionRepository,
      {
        executeFn: (fn) => fn(unitMock),
      } as UnitOfWork,
    );

    const updatedQuestion = await updateUseCase.execute({ 
      executorId: question.ownerId,
      questionId: question.questionId,
      data: updateData,
    });

    expect(updatedQuestion).toBe(question);
    expect(questionRepositoryMock.getById).toHaveBeenCalled();
    expect(unitMock.questionRepository.update).toHaveBeenCalled();
    expect(unitMock.questionRepository.unrefAllTags).toHaveBeenCalled();
    expect(unitMock.questionRepository.refTags).toHaveBeenCalled();
    expect(unitMock.tagRepository.createOrFindMany).toHaveBeenCalled();
  });

  test('Update question with another user', async () => {
    const userId = 'userId'; 
    
    const question = createQuestion();
    
    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const questionRepositoryMock = {
      getById: jest.fn().mockReturnValue(Promise.resolve(question)),
    } as Partial<QuestionRepository>;

    const updateUseCase = new QuestionUpdateUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      {
        executeFn: async () => {},
        executeSeq: async () => {},
      } as UnitOfWork,
    );

    await updateUseCase.execute({
      executorId: userId,
      questionId: question.questionId,
      data: {},
    });

    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
    expect(questionRepositoryMock.getById).toHaveBeenCalled();
  });

  test('Throw an error because unit of work is failed', () => {
    const question = createQuestion();

    const updateData = {
      title: 'title2',
      text: 'text2',
    } as QuestionUpdateInput['data'];

    const questionRepositoryMock = {
      getById: async () => question,
    } as Partial<QuestionRepository>;

    const updateUseCase = new QuestionUpdateUseCase(
      {} as IUserRatingValidator,
      questionRepositoryMock as QuestionRepository,
      { 
        executeFn: () => Promise.reject(new Error()),
        executeSeq: async () => {},
      } as UnitOfWork,
    );

    expect(updateUseCase.execute({
      executorId: question.ownerId,
      questionId: question.questionId,
      data: updateData,
    })).rejects.toThrow(Exception);
  });
});