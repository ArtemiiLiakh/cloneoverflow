import { Answer } from '@core/domain/entities/Answer';
import { Question } from '@core/domain/entities/Question';
import { User } from '@core/domain/entities/User';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserGetProfileUseCase } from '@core/services/user';

describe('Service: test UserGetProfileUseCase', () => {
  test('Get user profile', async () => {
    const userId = 'userId';
    
    const user = User.new({
      name: 'name',
      username: 'username',
    });

    const question = Question.new({
      id: 'questionId',
      ownerId: 'ownerId',
      title: 'title',
      text: 'text',
    });

    const answer = Answer.new({
      id: 'answerId',
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    const userRepositoryMock = {
      getUser: jest.fn().mockResolvedValue(Promise.resolve({ entity: user })),
    } as Partial<UserRepository>;
    
    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(Promise.resolve(true)),
      getPartialQuestion: jest.fn().mockResolvedValue(Promise.resolve({ entity: question })),
    } as Partial<QuestionRepository>;
    
    const answerRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(Promise.resolve(true)),
      getPartialAnswer: jest.fn().mockResolvedValue(Promise.resolve({ entity: answer, question })),
    } as Partial<AnswerRepository>;

    const getProfileUseCase = new UserGetProfileUseCase(
      userRepositoryMock as UserRepository, 
      answerRepositoryMock as AnswerRepository, 
      questionRepositoryMock as QuestionRepository,
    );

    const userProfile = await getProfileUseCase.execute({ userId });
    expect(userProfile.user.id).toBe(user.id);
    expect(userProfile.bestQuestion?.entity.questionId).toEqual(question.id);
    expect(userProfile.bestAnswer?.entity.answerId).toEqual(answer.id);
    
    expect(userRepositoryMock.getUser).toHaveBeenCalled();
    expect(questionRepositoryMock.isExist).toHaveBeenCalled();
    expect(questionRepositoryMock.getPartialQuestion).toHaveBeenCalled();

    expect(answerRepositoryMock.isExist).toHaveBeenCalled();
    expect(answerRepositoryMock.getPartialAnswer).toHaveBeenCalled();
  });

  test('Get user profile without best question and answer', async () => {
    const userId = 'userId';
    
    const user = User.new({
      name: 'name',
      username: 'username',
    });

    const userRepositoryMock = {
      getUser: jest.fn().mockResolvedValue(Promise.resolve({ entity: user })),
    } as Partial<UserRepository>;
    
    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(Promise.resolve(false)),
    } as Partial<QuestionRepository>;
    
    const answerRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(Promise.resolve(false)),
    } as Partial<AnswerRepository>;

    const getProfileUseCase = new UserGetProfileUseCase(
      userRepositoryMock as UserRepository, 
      answerRepositoryMock as AnswerRepository, 
      questionRepositoryMock as QuestionRepository,
    );

    const userProfile = await getProfileUseCase.execute({ userId });
    expect(userProfile.user.id).toBe(user.id);
    expect(userProfile.bestQuestion).toBeNull();
    expect(userProfile.bestAnswer).toBeNull();

    expect(userRepositoryMock.getUser).toHaveBeenCalled();
    expect(questionRepositoryMock.isExist).toHaveBeenCalled();
    expect(answerRepositoryMock.isExist).toHaveBeenCalled();
  });
});